//2024,07.31
//메세지 서버 소켓 파일
//해당 socket.js 모듈이 메세징 서버 역할을 제공함.


//socket.io 패키지 참조
const SocketIO = require('socket.io');


//socket.js 모듈 정의
module.exports = (server) => {

    //서버 소켓에 대한 CORS 이슈 해결을 위한 설정 추가
    const io = SocketIO(server, {
        path: "/socket.io",
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    })


    //자바스크립트에서 on(이벤트 핸들러(처리기))
    io.on("connection", (socket) => {

        /*
         * 백엔드에서 특정 사용자에게만 메세지를 전송해야 함. 
         *  - socket.to().emit() : 나를 제외한 특정 사용자들에게 메세지 전송
         *  - socket.emit() : 나에게만 메세지 전송
         * 
         *  - io.to().emit() : 나를 포함한 특정 사용자들에게 메세지 전송
         *  - io.emit() : 모든 사용자에게 메세지 전송
         */

        
        //템플릿에서 보내온 메세지 수신 처리기
        socket.on("sendAll", async (nickName, message) => {
            io.emit("broadCastAll", nickName, message);
        });
        
    });
}