//2024,07.31
//메세지 서버 소켓 파일
//해당 socket.js 모듈이 메세징 서버 역할을 제공함.

//io 객체 : 서버 소켓 객체
//io.to() : 나(클라이언트)를 포함한 서버 소켓과 연결된 모든 사용자
//io.emit() : 나(클라이언트)를 포함한 서버 소켓과 연결된 모든 사용자

//socket 객체 : 개별 사용자/그룹 단위 메세지 처리 객체
//socket.to() : 나(클라이언트)를 제외한 현재 채널에 접속한 모든 사용자
//socket.emit() : 나(클라이언트)를 제외한 서버에 연결된 모든 사용자

//socket.io 패키지 참조
const SocketIO = require("socket.io");

//DB 객체 참조
var db = require("./models/index");

//동적 SQL 쿼리를 직접 작성하여 전달하기 위한 sequelize 객체 참조
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

// OpenAI API 호출을 위한 axios 패키지 참조
const axios = require("axios");

// 파일 처리를 위한 file system 내장 객체 참조
const fs = require("fs");

// OpenAI 객체 생성
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//socket.js 모듈 정의
module.exports = (server) => {
  //서버 소켓의 입출력(I/O) 메세지 처리 객체 io 생성
  //input 메시지 : 웹브라우저에서 들어오는 메시지
  //output 메시지 : 서버소켓에서 웹브라우저로 전송하는 메시지
  //서버 소켓에 대한 CORS 이슈 해결을 위한 설정 추가
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

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

    socket.on("broadcast", function (msg) {
      io.emit("receiveAll", msg);
    });

    //템플릿에서 보내온 메세지 수신 처리기
    socket.on("sendAll", async (nickName, message) => {
      io.emit("broadCastAll", nickName, message);
    });

    // 지정한 채팅방 개설 및 입장처리 메시지 이벤트 수신기
    socket.on("entry", async (channel, nickName) => {
      socket.join(channel);
      socket
        .to(channel)
        .emit("entryOk", `${nickname}님이 ${channel} 채널에 입장하였습니다.`);
      io.to(msgData.Channel).emit("receiveChannel", message);
    });

    //ChatGPT-4o 질문-답변 처리 실시간 이벤트 수신기 정의
    // 프론트엔드 소켓에서 호출하는 gpt 서버 이벤트 수신기 정의
    socket.on("gpt", async (msg) => {
      //Step0: 사용자가 보내준 메시지 데이터를 다시 현재 사용자에게 발송해 화면에 표시
      //socket.emit('gptMessage', msg); -> 현재 메시지를 보내온 사용자에게만 서버에서 메시지 발송
      socket.emit("gptMessage", msg);

      //Step1: 프론트엔드 소켓에서 전달해준 메시지 데이터 추출 - prompt
      const prompt = msg.message;

      //Step2: OpenAI ChatGPT REST API 호출
      //서버와 gpt는 실시간 연결이 아니라, RestAPI 통신하여 요청과 응답을 처리
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o", // 지원 LLM 모델: gpt-4o-mini, gpt-4o, gpt-4, gpt-3.5-turbo
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      //Step3: ChatGPT 응답 메시지 반환 받기
      const gptMessage = response.data.choices[0].message.content;

      //Step4: 프론트엔드 소켓으로 GPT 응답 메시지 데이터 전송
      msg.message = gptMessage;
      msg.member_id = 0; // ChatGPT는 0번 사용자로 처리
      socket.emit("gptMessage", msg);
    });
  });
};
