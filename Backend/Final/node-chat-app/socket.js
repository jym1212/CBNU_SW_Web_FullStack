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
    //const io = SocketIO(server, { path: "/socket.io" });

    //서버 소켓에 대한 CORS 이슈 해결을 위한 설정 추가
    const io = SocketIO(server, {
        path: "/socket.io",
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    })


    //자바스크립트에서 on(이벤트 핸들러(처리기))
    //io 객체에 connection 이벤트 발생하면 콜백함수 실행
    //connection 이벤트는 웹브라우저와 서버 소켓 연결이 완료되면 발생
    io.on("connection", (socket) => {

        /*
         * 백엔드에서 특정 사용자에게만 메세지를 전송해야 함. 
         *  - socket.to().emit() : 나를 제외한 특정 사용자들에게 메세지 전송
         *  - socket.emit() : 나에게만 메세지 전송
         * 
         *  - io.to().emit() : 나를 포함한 특정 사용자들에게 메세지 전송
         *  - io.emit() : 모든 사용자에게 메세지 전송
         */

        
        //socket은 현재 연결된 사용자(웹브라우저) 서버 소켓 간 연결 객체
        //웹브라우저에서 서버 소켓에 brodcast라는 이벤트 수신기를 호출하면 관련 콜백함수 실행
        //socket.on("서버 소켓 이벤트 수신기명", 콜백함수);

        //웹브라우저(클라이언트/프론트엔드)에서 서버 소켓에 brodcast라는 이벤트 수신기를 호출
        //서버 소켓에서 클라이언트로 보내준 메세지를 수신하고,
        //콜백함수를 통해 서버에서 클라이언트로 메세지를 전송
        socket.on('broadcast', function (msg) {
            
            //현재 메세지 서버에 연결된 모든 사용자들(웹브라우저, 프론트엔드)에게 메세지 전송
            //클라이언트 메세지 수신 이벤트 receiveAll로 msg 데이터 전송
            //io.emit() 메소드는 서버 소켓(io) 연결된 모든 사용자에게 메세지를 전송
            //io.emit("클라이언트 이벤트 수신기명", 클라이언트로 보낼 메세지 데이터);
            io.emit("receiveAll", msg);
        });
        

        //지정한 채팅방 개설 및 입장 처리 메세지 이벤트 수신기
        //socket.on("서버 측 이벤트 수신기명", 콜백함수);
        socket.on('entry', async (channel, nickName) => {

            //서버 환경에 해당 채팅방 이름으로 채널 개설
            //현재 입장하는 사용자를 해당 채팅방 사용자로 등록
            //이미 해당 채널이 개설되어 있으면 신규 개설하지 않고 기존 채널로 입장
            //socket.join('채팅방 이름');
            socket.join(channel);


            //현재 접속자를 제외한 해당 채널에 이미 접속한 모든 사용자에게 메세지 발송
            //socket.to('채널명').emit();
            socket.to(channel).emit("entryOk", `'${nickName}'님이 ${channel} 채널에 입장했습니다.`); 


            //현재 채널에 입장하고 있는 사용자에게만 메세지 발송
            //현재 서버 소켓을 호출한(입장하는) 사용자에게만 메세지 발송
            //socket.emit();
            socket.emit("entryOk", `'${nickName}'라는 대화명으로 ${channel} 채널에 입장했습니다.`);
        });


        //채팅방 기준으로 해당 채팅방의 나를 포함한 모든 사용자들에게 메세지 전송
        //클라이언트에서 메세지 데이터를 JSON 포맷으로 전송
        socket.on('channelMsg', async (msgData) => {

            //클라이언트로 보낼 메세지 포맷 정의
            const message = `${msgData.nickName} : ${msgData.message}`;

            //현재 채널에 메세지를 보낸 나를 포함한 현재 채널의 모든 사용자에게 메세지 전송
            //io.to('채널명').emit();
            io.to(msgData.channel).emit('receiveChannel', message);
        });


        //사용자가 접속한 채팅방 명시적으로 퇴장 처리 메세지 이벤트 수신기
        socket.on('exit', async (channel, nickName) => {
            
            //나를 제외한 채팅방 내 모든 사용자에게 퇴장 알림 메세지 전송
            socket.to(channel).emit("exitOk", `'${nickName}'님이 퇴장했습니다.`);

            //현재 채널에서 퇴장 처리
            //socket.leave('채널명');
            socket.leave(channel);

            //현재 퇴장하는 사용자에게만 퇴장 알림 메세지 전송
            socket.emit("exitOk", `'${channel}' 채널을 퇴장했습니다.`);
        });
    });
}