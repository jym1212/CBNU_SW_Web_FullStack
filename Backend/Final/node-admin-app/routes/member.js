//2024.07.26
//사용자 계정 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//사용자 웹사이트에서 가입한 사용자 계정 목록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();


//2024.07.30
//moment 패키지 참조 - 날짜/시간 패키지
var moment = require('moment');


//ORM DB 객체 참조
var db = require('../models/index.js');

var sequelize = db.sequelize;
const { QueryTypes, Op } = require('sequelize');

/*
사용자 계정 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/member/list
- 호출 방식 : Get 방식
- 응답 결과 : 사용자 계정 목록 웹페이지 반환
*/
router.get('/list', async (req, res, next) => {

    //Step1 : 사용자 목록 조회 옵션 데이터 정의
    const searchOption = {
        email: "",
        name: "",
        use_state_code: "9"
    };

    //Step 2 : DB 사용자 계정 테이블에서 전체 사용자 계정 정보 조회
    const members = await db.Member.findAll();

    //Step 3 : DB에서 조회된 전체 사용자 계정 정보를 뷰파일에 전달 후 반환
    res.render('member/list', { moment, members, searchOption });
});


/*
사용자 계정 목록 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/member/list
- 호출 방식 : Post 방식
- 응답 결과 : 사용자 조회 옵션 결과 웹페이지 반환
*/
router.post('/list', async (req, res, next) => {

    //Step1 : 사용자가 입력한 조회 옵션 데이터 추출
    const email = req.body.email;
    const name = req.body.name;
    const use_state_code = req.body.use_state_code;

    //Step2 : DB 사용자 계정 테이블에서 전체 사용자 계정 정보 조회
    //동적 SQL 쿼리를 사용하여 사용자 계정 정보 조회
    let query = `SELECT *
    FROM member 
    WHERE member_id > 0`;

    //이메일 추가 필터 조건 반영
    if (email.length > 0) {
        query += ` AND email Like '%${email}%' `;
    }

    //이름 추가 필터조건 반영
    if (name.length > 0) {
        query += ` AND name Like '%${name}%' `;
    }

    //이용 상태 추가 필터조건 반영
    if (use_state_code != 9) {
        query += ` AND use_state_code = ${use_state_code}`;
    }

    query += ';';

    //sql쿼리를 직접 수행하는 구문        
    const members = await sequelize.query(query, {
        raw: true,
        type: QueryTypes.SELECT
    });

    //Step3 : 조회 옵션 기본 값을 사용자가 입력/선택한 값으로 저장하여 뷰파일에 전달
    const searchOption = {
        email: email,
        name: name,
        use_state_code: use_state_code
    };

    //Step4 : DB에서 조회된 전체 사용자 계정 정보를 뷰파일에 전달 후 반환
    res.render('member/list', { moment, members, searchOption });
});


/*
기존 관리자 계정 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/delete?id=1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 사용자 계정 정보를 DB 데이터 삭제 처리 후 목록 웹페이지로 이동
*/
router.get('/delete', async (req, res, next) => {

    //Step1 : URL 주소에서 삭제할 사용자 고유번호 추출
    const memberIdx = req.params.id;

    //Step2 : DB 사용자 계정 테이블에서 해당 사용자 계정 데이터 삭제 처리
    const deletedCnt = await db.Member.destroy({ where: { member_id: memberIdx } });

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

    //Step1 : 사용자가 수정한 폼태그 내 입력/선택 데이터 추출
    const memberIdx = req.body.member_id;

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const profile_img_path = req.body.profile_img_path;
    const telephone = req.body.telephone;
    const birth_date = req.body.birth_date;
    const entry_type_code = req.body.entry_type_code;
    const use_state_code = req.body.use_state_code;

    //Step2 : DB 관리자 계정 테이블에 수정할 JSON 데이터 생성
    const member = {
        email,
        password,
        name,
        profile_img_path,
        telephone,
        birth_date,
        entry_type_code,
        use_state_code,
        edit_date: Date.now(),
        edit_member_id: 1
    };

    //Step3 : DB 사용자 계정 테이블에 해당 사용자 계정 정보 수정
    const updatedCnt = await db.Member.update(member, { where: { member_id: memberIdx } });

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
    const memberIdx = req.params.id;

    //Step2 : DB 사용자 계정 테이블에서 해당 사용자 계정 정보 조회
    const member = await db.Member.findOne({ where: { member_id: memberIdx } });

    //Step3 : DB에서 조회된 사용자 계정 정보를 뷰파일에 전달 후 반환
    res.render('member/modify', { member });
})


module.exports = router;