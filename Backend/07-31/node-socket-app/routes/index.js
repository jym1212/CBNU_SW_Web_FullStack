var express = require('express');
var router = express.Router();

/* 메인 페이지 요청과 응답 처리 라우팅 메소드 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Chat-app' });
});

/*
채팅 서버와 연결된 모든 사용자들 간의 채팅하는 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/chat
- 요청 방식 : Get 방식
- 응답 결과 : 
*/
router.get('/chat', async (req, res, next) => {
  res.render('chat');
});

/*
특정 채팅방에 입장한 그룹 사용자들 간의 채팅하는 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/groupchat
- 요청 방식 : Get 방식
- 응답 결과 : 
*/
router.get('/groupchat', async (req, res, next) => {
  res.render('groupchat');
});

module.exports = router;
