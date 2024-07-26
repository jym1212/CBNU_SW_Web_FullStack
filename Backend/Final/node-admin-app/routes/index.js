//2024.07.26
//관리자 웹사이트 메인 페이지, 로그인 페이지 요청과 응답 처리 라우팅 모듈
//관리자 로그인 요청과 응답 처리

var express = require('express');
var router = express.Router();


/* 
기본 웹페이지 요청과 응답 처리 라우팅 메소드 
- 호출 주소 : http://localhost:5001/
- 호출 방식 : Get 방식
- 응답 결과 : index.ejs 뷰파일 반환
*/
router.get('/', async (req, res) => {
  res.render('index', { title: 'Admin-app' });
});


/*
관리자 로그인 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/login
- 호출 방식 : Get 방식
- 응답 결과 : login.ejs 뷰파일 반환
*/
router.get('/login', async (req, res, next) => {
  
  //login.ejs 뷰파일 렌더링 시, 레이아웃 페이지를 적용하지 않음.
  res.render('login', {layout: false});
})


/*
관리자 로그인 정보 처리 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/login
- 호출 방식 : Post 방식
- 응답 결과 : /main 메인 페이지로 이동 처리
*/
router.post('/login', async (req, res, next) => {
  const admin_id = req.body.admin_id;
  const admin_pw = req.body.admin_pw;

  //Id/password 체크 후 결과 확인
  const result = false;

  if (result) {
    //로그인 처리 완료 후 메인 페이지로 이동 (정상 로그인)
    res.redirect('/main');
    
  } else {
    //아이디 또는 암호가 틀리면 다시 로그인 페이지 반환
    res.render('login', { resultMsg: '로그인 실패' });
  }
});


/*
관리자 웹사이트 메인 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/main
- 호출 방식 : Get 방식
- 응답 결과 : main.ejs 뷰파일 반환
*/
router.get('/main', async (req, res, next) => {
  res.render('main');
})


module.exports = router;
