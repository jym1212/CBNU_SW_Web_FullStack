//2024.07.26
//채팅방 정보 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//채팅방(채널) 정보 목록, 등록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();


/*
채팅방 정보 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/list
- 호출 방식 : Get 방식
- 응답 결과 : channel/list.ejs 뷰파일 반환
*/
router.get('/list', async (req, res) => {

    //Step1 : DB 채팅방 테이블에서 전체 채팅방 정보 조회

    //Step2 : DB에서 조회된 전체 채팅방 정보를 뷰파일에 전달 후 반환
    res.render('channel/list');
});


/*
채팅방 정보 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/create
- 호출 방식 : Get 방식
- 응답 결과 : channel/create.ejs 뷰파일 반환
*/
router.get('/create', async (req, res) => {
    res.render('channel/create');
});


/*
신규 채널방 데이터 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/create
- 호출 방식 : Post 방식
- 응답 결과 : 채널방 목록 페이지로 이동 처리
*/
router.post('/create', async (req, res) => {

    //Step1 : 사용자가 입력한 폼태그 내 입력/선택 데이터 추출

    //Step2 : DB 채널방 테이블에 저장할 JSON 데이터 생성

    //Step3 : DB 채널방 테이블에 신규 채널방 데이터 등록 처리

    //Step4 : 등록 완료 후 채널방 목록 웹페이지로 이동
    res.redirect('/channel/list');
})


/*
기존 채널방 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://locathost:5001/channel/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정된 채널방 DB 데이터 수정 처리 후 목록 페이지로 이동
*/
router.post('/modify', async (req, res) => {

    //Step1 : 채널방 수정 데이터를 추출하고, 수정할 데이터 소스 생성

    //Step2 : DB 채널방 테이블에서 해당 채팅방 정보 수정

    //Step3 : 수정 완료 후 채널방 목록 웹페이지로 이동
    res.redirect('/channel/list');
})


/*
기존 채널방 데이터 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : DB에서 해당 채널방 정보를 조회하여 뷰파일에 전달 후 반환
*/
router.get('/modify/:id', async (req, res) => {

    //Step1 : URL 주소에서 수정할 채널방 고유번호 추출
    const channel_id = req.params.id;

    //Step2 : DB 채널방 테이블에서 해당 채널방 정보 조회

    //Step3 : DB에서 조회된 해당 채널방 정보를 뷰파일에 전달 후 반환
    res.render('channel/modify');
})


/*
기존 채널방 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/delete/1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 채널방 DB 데이터 삭제 처리 후 목록 페이지로 이동
*/
router.get('/delete/:id', async (req, res) => {

    //Step1 : URL 주소에서 삭제할 채널방 고유번호 추출
    const channel_id = req.params.id;

    //Step2 : DB 채널방 테이블에서 해당 채널방 데이터 삭제 처리

    //Step3 : 삭제 완료 후 채널방 목록 웹페이지로 이동
    res.redirect('/channel/list');
})

module.exports = router;