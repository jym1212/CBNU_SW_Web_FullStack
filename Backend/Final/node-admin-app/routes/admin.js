var express = require('express');
var router = express.Router();


/*
관리자 계정 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/list
- 호출 방식 : Get 방식
- 응답 결과 : admin/list.ejs 뷰파일 반환
*/
router.get('/list', function(req, res){
    res.render('admin/list');
});


/*
관리자 계정 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/create
- 호출 방식 : Get 방식
- 응답 결과 : admin/create.ejs 뷰파일 반환
*/
router.get('/create', function(req, res){
    res.render('admin/create');
});


/*
관리자 계정 신규 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/create
- 호출 방식 : Post 방식
- 응답 결과 : 관리자 계정 목록 페이지로 이동 처리 (http://localhost:5001/admin/list)
*/
router.post('/create', function(req, res){
    res.redirect('/admin/list');
})


module.exports = router;