//2024.07.26
//관리자 계정 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//관리자 사이트에서 가입한 관리자 계정 목록, 등록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();


//2024.07.30
//moment 패키지 참조 - 날짜/시간 패키지
var moment = require('moment');


//bcrpt 패키지 참조 - 단방향 암호화 패키지
//관리자 암호 단방향 암호화(해시 알고리즘)
var bcrypt = require('bcryptjs');


//ORM DB 객체 참조
var db = require('../models/index.js');

//동적 SQL 쿼리를 직접 작성해서 전달하기 위한 참조
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;


/*
관리자 계정 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/list
- 호출 방식 : Get 방식
- 응답 결과 : 관리자 계정 목록 웹페이지 반환
*/
router.get('/list', async (req, res, next) => {

    //Step1 : 관리자 목록 조회 옵션 데이터 정의
    //조회 옵션 데이터를 JSON 객체로 정의하여 뷰파일에 전달
    const searchOption = {
        company_code: "9",
        admin_id: "",
        used_yn_code: "9"
    };

    //Step2 : DB 관리자 계정 테이블에서 전체 관리자 계정 정보 조회
    //findAll() = SELECT * FROM admin;
    //SQL 구문으로 ORM Framework이 내부적으로 자동 생성하여 DB 서버에 전달/실행되고, 조회 결과를 반환
    const admins = await db.Admin.findAll();

    //Step3 : DB에서 조회된 전체 관리자 계정 정보를 뷰파일에 전달 후 반환
    res.render('admin/list', { moment, admins, searchOption });


    //Sequelize ORM 활용
    //모든 데이터 목록에서 원하는 컬럼 목록만 조회
    //attributes 속성에 조회할 컬럼명을 배열로 정의
    //SELECT admin_member_id, admin_id, ..., reg_date FROM admin WHERE company_code = '1';
    const admins1 = await db.Admin.findAll({
        attributes: ['admin_member_id', 'admin_id', 'admin_name', 'email', 'company_code', 'dept_name', 'used_yn_code', 'reg_date'],
        where: { company_code: '1' } //WHERE 조건절 추가 가능
    });


    //모든 데이터 목록에서 원하는 컬럼 목록만 정렬
    //order 속성에 정렬 기준 컬럼명과 정렬 방식을 배열로 정의
    //SELECT admin_member_id, admin_id, ..., reg_date FROM admin ORDER BY reg_date DESC;
    const admins2 = await db.Admin.findAll({
        attributes: ['admin_member_id', 'admin_id', 'admin_name', 'email', 'company_code', 'dept_name', 'used_yn_code', 'reg_date'],
        order: [['reg_date', 'DESC']]  //정렬 기준을 reg_date 컬럼으로 내림차순 정렬
    });

    //해당 테이블 전체 건수 조회
    //count() = SELECT COUNT(*) FROM admin;
    const adminsCount = await db.Admin.count();

    
    /*
    //순수 SQL 구문을 DB 서버에 전달해서 동일한 결과값 반환
    let query = `SELECT
                admin_member_id,
                admin_id,
                admin_name,
                email,
                company_code,
                dept_name,
                used_yn_code,
                reg_date
            FROM admin
            WHERE used_yn_code = 1`;
    
    //회사코드 추가 필터 조건 반영
    if (company_code != '9') {
        query += ` AND company_code = ${company_code}`;
    }

    //관리자 ID 추가 필터 조건 반영
    if (admin_id.length > 0) {
        query += ` AND admin_id Like %${admin_id}%`;
    }

    //사용정보 옵션 추가 필터 조건 반영
    if (used_yn_code != '9') {
        query += ` AND used_yn_code = ${used_yn_code}`;
    }

    query += `ORDER BY reg_date DESC;`;
    
    //SQL 쿼리를 직접 수행하여 결과값 반환
    const admins3 = await sequelize.query(query, {
        raw: true,
        type: QueryTypes.SELECT
    });
    */
});


/*
관리자 계정 목록 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/list
- 호출 방식 : Post 방식
- 응답 결과 : 관리자 조회 옵션 결과 웹페이지 반환
*/
router.post('/list', async (req, res, next) => {

    //Step1: 사용자가 입력한 조회 옵션 데이터 추출
    const company_code = req.body.company_code;
    const admin_id = req.body.admin_id;
    const used_yn_code = req.body.used_yn_code;

    //Step2 : DB 관리자 계정 테이블에서 해당 관리자 계정 정보 조회
    const admins = await db.Admin.findAll({ where: { admin_id: admin_id } }); 

    //Step3 : 조회 옵션 기본 값을 사용자가 입력/선택한 값으로 저장하여 뷰파일에 전달
    const searchOption = {
        company_code: company_code,
        admin_id: admin_id,
        used_yn_code: used_yn_code
    };

    //Step4 : DB에서 조회된 해당 관리자 계정 정보를 뷰파일에 전달 후 반환
    res.render('admin/list', { moment, admins, searchOption });
});


/*
신규 관리자 계정 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/create
- 호출 방식 : Get 방식
- 응답 결과 : 신규 관리자 계정 등록 웹페이지 반환
*/
router.get('/create', async (req, res, next) => {
    
    //신규 관리자 계정 등록을 위한 웹페이지 반환
    res.render('admin/create');
});


/*
신규 관리자 계정 데이터 등록 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/create
- 호출 방식 : Post 방식
- 응답 결과 : 신규 관리자 계정 정보를 DB 데이터 등록 처리 후 목록 웹페이지로 이동
*/
router.post('/create', async (req, res, next) => {
    
    //Step1 : 사용자가 입력한 폼태그 내 입력/선택 데이터 추출
    const admin_id = req.body.admin_id;
    const admin_password = req.body.admin_password;
    const company_code = req.body.company_code;
    const dept_name = req.body.dept_name;
    const admin_name = req.body.admin_name;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const used_yn_code = req.body.used_yn_code;

    //Step2 : 관리자 계정 암호 단방향 암호화 처리
    //hash('사용자가 입력한 암호', 암호화 강도);
    //단방향이기에 암호화만 가능하고, 복호화는 불가능함.
    const encryptedPassword = await bcrypt.hash(admin_password, 12);

    //Step3 : DB 관리자 계정 테이블에 저장할 JSON 데이터 생성
    //주의 : DB에 저장할 데이터 구조는 반드시 해당 모델 속성명과 동일해야 함.
    //신규 데이터 등록 시, 모델의 속성 중 NN(NotNull) 속성에 대한 값은 반드시 입력되어야 함.
    const admin = {
        admin_id,
        admin_password: encryptedPassword,  //암호화된 비밀번호 값 저장
        company_code,
        dept_name,
        admin_name,
        email,
        telephone,
        used_yn_code,
        reg_date: Date.now(),
        reg_member_id: 1
    };

    //Step4 : DB 관리자 계정 테이블에 신규 관리자 계정 데이터 등록 처리
    //실제 저장된 관리자 계정 정보를 DB 서버가 저장하고 반환함.
    //create() = INSERT INTO admin(...) VALUES(...); 
    //SQL 구문으로 ORM Framework이 내부적으로 자동 생성하여 DB 서버에 전달/실행되고, 저장 결과를 반환
    const registedAdmin = await db.Admin.create(admin);

    //Step5 : 등록 완료 후 관리자 계정 목록 웹페이지로 이동
    res.redirect('/admin/list');
})


/*
기존 관리자 계정 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/delete?id=1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 관리자 계정 정보를 DB 데이터 삭제 처리 후 목록 웹페이지로 이동
*/
router.get('/delete', async (req, res, next) => {

    //Step1 : URL 주소에서 삭제할 관리자 고유번호 추출
    const adminIdx = req.query.id;

    //Step2 : DB 관리자 계정 테이블에서 해당 관리자 계정 데이터 삭제 처리
    //DB 서버가 해당 관리자 계정 정보를 삭제하고, 삭제된 건수를 반환함.
    const deletedCnt = await db.Admin.destroy({ where: { admin_member_id: adminIdx } });

    //Step3 : 삭제 완료 후 관리자 계정 목록 웹페이지로 이동
    res.redirect('/admin/list');
})


/*
기존 관리자 계정 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://locathost:5001/admin/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정된 관리자 계정 정보를 DB 데이터 수정 처리 후 목록 웹페이지로 이동
*/
router.post('/modify', async (req, res, next) => {

    //Step1 : 사용자가 수정한 폼태그 내 입력/선택 데이터 추출
    //관리자 계정 고유번호를 hidden 태그를 통해 추출
    const adminIdx = req.body.admin_member_id;
    
    const admin_id = req.body.admin_id;
    const admin_password = req.body.admin_password;
    const company_code = req.body.company_code;
    const dept_name = req.body.dept_name;
    const admin_name = req.body.admin_name;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const used_yn_code = req.body.used_yn_code;

    //Step2 : DB 관리자 계정 테이블에 수정할 JSON 데이터 생성
    //주의 : DB에 저장할 데이터 구조는 반드시 해당 모델 속성명과 동일해야 함.
    const admin = {
        company_code,
        dept_name,
        admin_name,
        email,
        telephone,
        used_yn_code,
        edit_date: Date.now(),
        edit_member_id: 1
    };
    
    //Step3 : DB 관리자 계정 테이블에 해당 관리자 계정 정보 수정
    //실제 수정된 관리자 계정 정보를 DB 서버가 저장하고, 수정된 건수를 반환함.
    //update() = UPDATE admin SET ... WHERE admin_member_id = 1;
    const updatedCnt = await db.Admin.update(admin, { where: { admin_member_id : adminIdx } });

    //Step4 : 수정 완료 후 관리자 계정 목록 웹페이지로 이동
    res.redirect('/admin/list');
})


/*
기존 관리자 계정 데이터 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/admin/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : 기존 관리자 계정 정보가 포함된 수정 웹페이지 제공
*/
router.get('/modify/:id', async (req, res, next) => {

    //Step1 : URL 주소에서 수정할 관리자 계정 고유번호 추출
    const adminIdx = req.params.id;

    //Step2 : DB 관리자 계정 테이블에서 해당 관리자 계정 정보 조회
    const admin = await db.Admin.findOne({ where: { admin_member_id: adminIdx } });

    //Step3 : DB에서 조회된 해당 관리자 계정 정보를 뷰파일에 전달 후 반환
    res.render('admin/modify', { admin });
})


module.exports = router;