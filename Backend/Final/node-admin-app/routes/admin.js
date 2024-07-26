//2024.07.26
//관리자 계정 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//관리자 사이트에서 가입한 관리자 계정 목록, 등록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();


/*
관리자 계정 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/list
- 호출 방식 : Get 방식
- 응답 결과 : admin/list.ejs 뷰파일 반환
*/
router.get('/list', async (req, res) => {
    res.render('admin/list');
});


/*
관리자 계정 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/create
- 호출 방식 : Get 방식
- 응답 결과 : admin/create.ejs 뷰파일 반환
*/
router.get('/create', async(req, res) => {
    res.render('admin/create');
});


/*
관리자 계정 신규 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/create
- 호출 방식 : Post 방식
- 응답 결과 : 관리자 계정 목록 페이지로 이동 처리
*/
router.post('/create', async (req, res) => {
    const admin_id = req.body.admin_id;
    const admin_pwd = req.body.admin_pwd;

    res.redirect('/admin/list');
})


/*
기존 관리자 계정 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://locathost:5001/admin/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정된 관리자 계정 정보를 DB 데이터 수정 처리 후 목록 페이지로 이동
*/
router.post('/modify', async (req, res) => {
    res.redirect('/admin/list');
})


/*
기존 관리자 계정 데이터 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : DB에서 해당 관리자 계정 정보를 조회하여 뷰파일에 전달 후 반환
*/
router.get('/modify/:id', async (req, res) => {
    const admin_id = req.params.id;

    res.render('admin/modify');
})


/*
기존 관리자 계정 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/delete/1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 관리자 계정 정보를 DB 데이터 삭제 처리 후 목록 페이지로 이동
*/
router.get('/delete/:id', async (req, res) => {
    const admin_id = req.params.id;

    res.redirect('/admin/list');
})


module.exports = router;