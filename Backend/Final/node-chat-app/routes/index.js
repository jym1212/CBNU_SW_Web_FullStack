var express = require('express');
var router = express.Router();

/* 메인 페이지 요청과 응답 처리 라우팅 메소드 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chat-app' });
});

/*
샘플용 프론트엔드 채팅 웹페이지
- 채팅 서버와 연결된 모든 사용자들 간의 채팅하는 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5000/chat
- 요청 방식 : Get 방식
*/
router.get('/chat', async (req, res, next) => {
  res.render('chat');
});

/*
샘플용 프론트엔드 채팅 웹페이지
- 특정 채팅방에 입장한 그룹 사용자들 간의 채팅하는 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5000/groupchat
- 요청 방식 : Get 방식
*/
router.get('/groupchat', async (req, res, next) => {
  res.render('groupchat');
});

module.exports = router;
