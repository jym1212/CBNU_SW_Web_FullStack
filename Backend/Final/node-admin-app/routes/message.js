//2024.07.26
//체팅 메세지 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//채팅 메세지 정보 목록 관리 기능

var express = require('express');
var router = express.Router();

var moment = require('moment');

//2024.07.30
//ORM DB 객체 참조
var db = require('../models/index.js');

var sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');


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

    //Step1 : 채팅 메세지 목록 조회 옵션 데이터 정의
    const searchOption = {
        nick_name: "",
        message: "",
        msg_type_code: "9"
    };

    //Step2 : DB 채팅 메세지 테이블에서 전체 채팅 메세지 정보 조회
    const messages = await db.ChannelMsg.findAll();

    //Step2 : DB에서 조회된 전체 채팅 메세지 정보를 뷰파일에 전달 후 반환
    res.render('message/list', {moment, messages, searchOption});
});

/*
채팅 메세지 목록 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/message/list
- 호출 방식 : Post 방식
- 응답 결과 : 채팅 메세지 조회 옵션 결과 웹페이지 반환
*/
router.post('/list', inLoggined, async (req, res, next) => {
    
    //Step1 : 사용자가 입력한 조회 옵션 데이터 추출
    const nick_name = req.body.nick_name;
    const message = req.body.message;
    const msg_type_code = req.body.msg_type_code;

    //Step2 : DB 채팅 메세지 테이블에서 해당 채팅 메세지 정보 조회
    let query = ` SELECT
        channel_msg_id,
        nick_name,
        message,
        channel_id,
        member_id,
        msg_type_code,
        msg_state_code,
        msg_date
    FROM channel_msg
    WHERE channel_msg_id > 0`;
    
    if (nick_name.length > 0) {
        query += ` AND nick_name Like '%${nick_name}%' `;
    }

    if (message.length > 0) {
        query += ` AND message Like '%${message}%' `;
    }

    if (msg_type_code != 9) {
        quert += ` AND msg_type_code = ${msg_type_code}`;
    }

    const channels = await db.sequelize.query(query, {
        raw: true,
        type: QueryTypes.SELECT
    });

    //Step3 : 조회 옵션 기본 값을 사용자가 입력/선택한 값으로 저장하여 뷰파일에 전달
    const searchOption = {
        nick_name: nick_name,
        message: message,
        msg_type_code: msg_type_code
    };

    //Step4 : DB에서 조회된 해당 채팅 메세지 정보를 뷰파일에 전달 후 반환
    res.render('message/list', {moment, messages, searchOption});
})

module.exports = router;