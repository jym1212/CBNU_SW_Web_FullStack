//2024.07.26
//관리자 웹사이트 메인 페이지, 로그인 페이지 요청과 응답 처리 라우팅 모듈
//관리자 로그인 요청과 응답 처리

var express = require('express');
var router = express.Router();

//2024.07.30
//bcrpt 패키지 참조 - 단방향 암호화 패키지
//관리자 암호 단방향 암호화(해시 알고리즘)
var bcrypt = require('bcryptjs');


//ORM DB 객체 참조
var db = require('../models/index.js');


//2024.08.02
//관리자 로그인 여부 체크 미들웨어 함수 참조
const { inLoggined } = require('./sessionMiddleware.js');


/* 
기본 웹페이지 요청과 응답 처리 라우팅 메소드 
- 호출 주소 : http://localhost:5001/
- 호출 방식 : Get 방식
- 응답 결과 : index.ejs 뷰파일 반환
*/
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Admin-app', layout: false });
});


/*
관리자 로그인 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/login
- 호출 방식 : Get 방식
- 응답 결과 : login.ejs 뷰파일 반환
*/
router.get('/login', async (req, res, next) => {

  //아이디/암호가 일치하지 않는 경우, 다시 login 뷰파일을 전달하고,
  //login 뷰파일에 결과 메세지 데이터를 전달함.
  let resultMsg = {
    code: 200,
    msg: ""
  };
  
  //login.ejs 뷰파일 렌더링 시, 레이아웃 페이지를 적용하지 않음.
  res.render('login', { layout: false, resultMsg });
})


/*
관리자 로그인 정보 처리 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/login
- 호출 방식 : Post 방식
- 응답 결과 : /main 메인 페이지로 이동 처리
*/
router.post('/login', async (req, res, next) => {

  //아이디/암호가 일치하지 않는 경우, 다시 login 뷰파일을 전달하고,
  //login 뷰파일에 결과 메세지 데이터를 전달함.
  let resultMsg = {
    code: 200,
    msg: ""
  };

  try {
    //Step1 : 관리자 아이디/비밀번호 정보 추출
    const admin_id = req.body.admin_id;
    const admin_password = req.body.admin_password;

    //Step2 : DB에서 동일한 관리자 아이디 정보 조회
    const admin = await db.Admin.findOne({ where: { admin_id: admin_id } });

    //Step3 : DB에 저장된 비밀번호와 관리자 입력 비밀번호를 체크
    //동일한 아이디가 존재하는 경우
    if (admin) {

      //DB에 저장된 비밀번호가 입력한 비밀번호가 일치하는지 체크
      //bcrypt.compare(사용자가 입력한 비밀번호, DB에 저장된 암호화된 비밀번호);
      //compare() 메소드는 비밀번호가 일치하는 경우 true, 일치하지 않는 경우 false 반환

      //비밀번호가 일치하는 경우
      if (await bcrypt.compare(admin_password, admin.admin_password)) {

        //Step4 : 아이디/비밀번호가 일치하면 서버 세션에 로그인 사용자 정보 저장
        //서버 세션에 저장할 로그인 사용자 주요 정보 설정
        var seesionLoginData = {
          admin_member_id: admin.admin_member_id,
          admin_id: admin.admin_id,
          admin_password: admin.admin_password,
          company_code: admin.company_code,
          dept_name: admin.dept_name,
          admin_name: admin.admin_name
        };

        //req.session 속성에 loginUser 동적 속성 정의
        //현재 로그인한 사용자 주요 데이터 저장
        req.session.loginUser = seesionLoginData;

        //현재 사용자의 로그인 여부를 동적 속성 isLogined 정의
        req.session.isLogined = true;

        //Step5 : 서버 세션 최종 저장 후, 메인 페이지로 이동
        req.session.save(function () {
          console.log('세션 저장 완료');

          resultMsg.code = 200;
          resultMsg.msg = "로그인에 성공했습니다."
          
          res.redirect('/main');
        });
      }

      //비밀번호가 일치하지 않는 경우
      else {

        resultMsg.code = 402;
        resultMsg.msg = "비밀번호가 일치하지 않습니다.";
        res.render('login', { layout: false, resultMsg });
      }
    }

    //동일한 아이디가 존재하지 않는 경우
    else {

      resultMsg.code = 401;
      resultMsg.msg = "동일한 아이디가 존재하지 않습니다.";
      res.render('login', { layout: false, resultMsg });
    }
    
  } catch (error) {
    resultMsg.code = 500;
    resultMsg.msg = "서버에 에러가 발생했습니다.";
    res.render('login', { layout: false, resultMsg });
  }
});


/*
관리자 웹사이트 메인 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/main
- 호출 방식 : Get 방식
- 응답 결과 : main.ejs 뷰파일 반환
*/
router.get('/main', inLoggined, async (req, res, next) => {
  res.render('main');
})


module.exports = router;
