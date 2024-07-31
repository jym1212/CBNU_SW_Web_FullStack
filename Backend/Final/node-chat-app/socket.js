//2024,07.31
//메세지 서버 소켓 파일
//해당 socket.js 모듈이 메세징 서버 역할을 제공함.

//socket.io 패키지 참조
const SocketIO = require('socket.io');

//socket.js 모듈 정의
module.exports = (server) => {

    //서버 소켓 입출력(In/Out) 메세지 처리 객체 생성
    //input 메세지 : 웹브라우저에서 들어오는 메세지
    //output 메세지 : 서버 소켓에서 웹브라우저로 전송하는 메세지
    const io = SocketIO(server, { path: "/socket.io" });

    io.on("connection", (socket) => {
        //socket은 현재 연결된 사용자(웹브라우저) 서버 소켓 간 연결 객체
        //웹브라우저에서 서버 소켓에 brodcast라는 이벤트 수신기를 호출하면 관련 콜백함수 실행
        //socket.on("서버 소켓 이벤트 수신기명", 콜백함수);

        //웹브라우저(클라이언트/프론트엔드)에서 서버 소켓에 brodcast라는 이벤트 수신기를 호출
        //서버 소켓에서 클라이언트로 보내준 메세지를 수신하고,
        //콜백함수를 통해 서버에서 클라이언트로 메세지를 전송
        socket.on("broadcast", function (msg) {
            
            //현재 메세지 서버에 연결된 모든 사용자들(웹브라우저, 프론트엔드)에게 메세지 전송
            //클라이언트 메세지 수신 이벤트 receiveAll로 msg 데이터 전송
            //io.emit() 메소드는 서버 소켓(io) 연결된 모든 사용자에게 메세지를 전송
            //io.emit("클라이언트 이벤트 수신기명", 클라이언트로 보낼 메세지 데이터);
            io.emit("receiveAll", msg);
        });

    });
}