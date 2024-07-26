//2024.07.26
//사용자 계정 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//사용자 웹사이트에서 가입한 사용자 계정 목록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();


/*
사용자 계정 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/member/list
- 호출 방식 : Get 방식
- 응답 결과 : member/list.ejs 뷰파일 반환
*/
router.get('/list', async (req, res) => {
    res.render('member/list');
});


/*
기존 사용자 계정 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://locathost:5001/member/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정된 사용자 계정 정보를 DB 데이터 수정 처리 후 목록 페이지로 이동
*/
router.post('/modify', async (req, res) => {
    res.redirect('/member/list');
})


/*
기존 사용자 계정 데이터 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/member/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : DB에서 해당 사용자 계정 정보를 조회하여 뷰파일에 전달 후 반환
*/
router.get('/modify/:id', async (req, res) => {
    const member_id = req.params.id;

    res.render('member/modify');
})


/*
기존 관리자 계정 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/delete/1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 사용자 계정 정보를 DB 데이터 삭제 처리 후 목록 페이지로 이동
*/
router.get('/delete/:id', async (req, res) => {
    const member_id = req.params.id;

    res.redirect('/member/list');
})

module.exports = router;