//2024.07.26
//사용자 계정 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//사용자 웹사이트에서 가입한 사용자 계정 목록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();


//2024.07.30
//ORM DB 객체 참조
var db = require('../models/index.js');


/*
사용자 계정 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/member/list
- 호출 방식 : Get 방식
- 응답 결과 : 사용자 계정 목록 웹페이지 반환
*/
router.get('/list', async (req, res, next) => {

    //Step 1 : DB 사용자 계정 테이블에서 전체 사용자 계정 정보 조회

    //Step 2 : DB에서 조회된 전체 사용자 계정 정보를 뷰파일에 전달 후 반환
    res.render('member/list');
});


/*
기존 관리자 계정 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/delete?id=1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 사용자 계정 정보를 DB 데이터 삭제 처리 후 목록 웹페이지로 이동
*/
router.get('/delete', async (req, res, next) => {

    //Step1 : URL 주소에서 삭제할 사용자 고유번호 추출
    const member_id = req.params.id;

    //Step2 : DB 사용자 계정 테이블에서 해당 사용자 계정 데이터 삭제 처리

    //Step3 : 삭제 완료 후 사용자 계정 목록 웹페이지로 이동
    res.redirect('/member/list');
})


/*
기존 사용자 계정 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://locathost:5001/member/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정된 사용자 계정 정보를 DB 데이터 수정 처리 후 목록 웹페이지로 이동
*/
router.post('/modify', async (req, res, next) => {

    //Step1 : 사용자 계정 수정 데이터를 추출하고, 수정할 데이터 소스 생성

    //Step2 : DB 사용자 계정 테이블에 해당 사용자 계정 정보 수정

    //Step3 : 수정 완료 후 사용자 계정 목록 웹페이지로 이동
    res.redirect('/member/list');
})


/*
기존 사용자 계정 데이터 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/member/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : 기존 사용자 계정 정보가 포함된 수정 웹페이지 제공
*/
router.get('/modify/:id', async (req, res, next) => {

    //Step1 : URL 주소에서 수정할 사용자 계정 고유번호 추출
    const member_id = req.params.id;

    //Step2 : DB 사용자 계정 테이블에서 해당 사용자 계정 정보 조회

    //Step3 : DB에서 조회된 사용자 계정 정보를 뷰파일에 전달 후 반환
    res.render('member/modify');
})


module.exports = router;