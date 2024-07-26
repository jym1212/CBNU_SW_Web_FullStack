//2024.07.26
//체팅 메세지 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//채팅 메세지 정보 목록 관리 기능

var express = require('express');
var router = express.Router();

/*
채팅 메세지 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/message/list
- 호출 방식 : Get 방식
- 응답 결과 : message/list.ejs 뷰파일 반환
*/
router.get('/list', async (req, res) => {
    res.render('message/list');
});

module.exports = router;