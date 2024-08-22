//2024.08.21
//넥스트 프론트엔드 클라이언트측 Socket.io 공통 모듈 구현
//npm i socket.io-client 프론트엔드 프로젝트에 socket.io 지원 패키지 설치 필요

//socketio client io 객체를 생성
import { io } from 'socket.io-client';

//채팅서버 URL주소 설정
const chatServerURL = 'http://localhost:5000';

//io객체를 이용해 클라이언트 socket 객체를 생성하고 반환
//io('서버 소켓 주소',연결 옵션{autoConnect:false});
export const socket = io(chatServerURL, { autoConnect: false });
