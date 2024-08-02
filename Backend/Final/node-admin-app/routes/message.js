//2024.07.26
//체팅 메세지 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//채팅 메세지 정보 목록 관리 기능

var express = require('express');
var router = express.Router();


//2024.07.30
//ORM DB 객체 참조
var db = require('../models/index.js');

var sequelize = db.sequelize;
const { QueryTypes, Op } = require('sequelize');


//2024.08.02
//관리자 로그인 여부 체크 미들웨어 함수 참조
const { inLoggined } = require('./sessionMiddleware.js');


/*
채팅 메세지 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/message/list
- 호출 방식 : Get 방식
- 응답 결과 : 채팅 메세지 목록 웹페이지 반환
*/
router.get('/list', inLoggined, async (req, res, next) => {

    //Step1 : DB 채팅 메세지 테이블에서 전체 채팅 메세지 정보 조회

    //Step2 : DB에서 조회된 전체 채팅 메세지 정보를 뷰파일에 전달 후 반환
    res.render('message/list');
});

module.exports = router;