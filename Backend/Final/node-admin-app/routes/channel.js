//2024.07.26
//채팅방 정보 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//채팅방(채널) 정보 목록, 등록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();

//2024.08.01
//moment 패키지 참조 - 날짜/시간 패키지
var moment = require('moment');

//ORM DB 객체 참조
var db = require('../models/index.js');

//동적 SQL 쿼리를 직접 작성해서 전달하기 위한 참조
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;


/*
채팅방 정보 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/list
- 호출 방식 : Get 방식
- 응답 결과 : 채널방 목록 웹페이지 반환
*/
router.get('/list', async (req, res, next) => {

    //Step1 : DB 채팅방 테이블에서 전체 채팅방 정보 조회
    const channels = await db.Channel.findAll();

    //Step2 : DB에서 조회된 전체 채팅방 정보를 뷰파일에 전달 후 반환
    res.render('channel/list', { moment, channels });
});


/*
채팅방 정보 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/create
- 호출 방식 : Get 방식
- 응답 결과 : 신규 채널방 등록 웹페이지 반환
*/
router.get('/create', async (req, res, next) => {

    //신규 채팅방 등록을 위한 웹페이지 반환
    res.render('channel/create');
});


/*
신규 채널방 데이터 등록 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/create
- 호출 방식 : Post 방식
- 응답 결과 : 채널방 목록 웹페이지로 이동 처리
*/
router.post('/create', async (req, res, next) => {

    //Step1 : 사용자가 입력한 폼태그 내 입력/선택 데이터 추출
    const channel_id = channel_id;
    const channel_name = channel_name;
    const channel_desc = channel_desc;
    const user_limit = user_limit;
    const channel_state_code = channel_state_code;
    const category_code = category_code;

    //Step2 : DB 채널방 테이블에 저장할 JSON 데이터 생성
    const channel = {
        channel_id,
        community_id: 1,
        channel_name,
        channel_desc,
        user_limit,
        channel_state_code,
        category_code,
        reg_date: Date.now(),
        reg_member_id: 1
    }

    //Step3 : DB 채널방 테이블에 신규 채널방 데이터 등록 처리
    const registedChannel = await db.Channel.create(channel);

    //Step4 : 등록 완료 후 채널방 목록 웹페이지로 이동
    res.redirect('/channel/list');
})


/*
기존 채널방 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/delete?id=1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 채널방 DB 데이터 삭제 처리 후 목록 웹페이지로 이동
*/
router.get('/delete', async (req, res, next) => {

    //Step1 : URL 주소에서 삭제할 채널방 고유번호 추출
    const channelIdx = req.query.id;

    //Step2 : DB 채널방 테이블에서 해당 채널방 데이터 삭제 처리
    const deletedCnt = await db.Channel.destroy({ where: { channel_id: channelIdx } });

    //Step3 : 삭제 완료 후 채널방 목록 웹페이지로 이동
    res.redirect('/channel/list');
})


/*
기존 채널방 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://locathost:5001/channel/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정된 채널방 DB 데이터 수정 처리 후 목록 웹페이지로 이동
*/
router.post('/modify', async (req, res, next) => {

    //Step1 : 채널방 수정 데이터를 추출하고, 수정할 데이터 소스 생성
    const channelIdx = req.body.channel_id;

    const channel_name = channel_name;
    const channel_desc = channel_desc;
    const user_limit = user_limit;
    const channel_state_code = channel_state_code;
    const category_code = category_code;

    //Step2 : DB 채팅방 테이블에 수정할 JSON 데이터 생성
    const channel = {
        channel_name,
        channel_desc,
        user_limit,
        channel_state_code,
        category_code,
        edit_date: Date.now(),
        edit_member_id: 2
    };

    //Step3 : DB 채널방 테이블에서 해당 채팅방 정보 수정
    const updatedCnt = await db.Channel.update(channel, { where: { channel_id: channelIdx } });

    //Step4 : 수정 완료 후 채널방 목록 웹페이지로 이동
    res.redirect('/channel/list');
})


/*
기존 채널방 데이터 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/channel/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : 기존 채널방 정보가 포함된 수정 웹페이지 제공
*/
router.get('/modify/:id', async (req, res, next) => {

    //Step1 : URL 주소에서 수정할 채널방 고유번호 추출
    const channelIdx = req.params.id;

    //Step2 : DB 채널방 테이블에서 해당 채널방 정보 조회
    const channel = await db.Channel.findOne({ where: { channel_id: channelIdx } });

    //Step3 : DB에서 조회된 해당 채널방 정보를 뷰파일에 전달 후 반환
    res.render('channel/modify', { channel });
})


module.exports = router;