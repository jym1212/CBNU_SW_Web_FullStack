//노드 기본 백엔드 앱의 공통적인 사용자 요청과 응답처리 전용 라우터 파일
//해당 라우터 파일의 기본 호출 주소 : http://localhost:3000/
//모든 라우터 파일은 기본 호출 주소 체계를 app.js에서 기본 정의함.

//express 객체 참조
var express = require('express');

//- 각종 사용자 요청과 응답 처리할 수 있는 router 객체를 
//  express.Router() 메소드를 통해 생성
//- 생성된 router 객체를 통해 각종 사용자 요청과 응답 처리
var router = express.Router();

/* 
메인 웹페이지 요청과 응답처리 랃우팅 메소드 
- req(request) : 클라이언트에서 서버로 요청 정보를 담은 객체
- res(response) : 서버에서 클라이언트로 응답 정보를 담은 객체
- 호출주소 : http://localhost:3000/
*/
router.get('/', function(req, res, next) {

  console.log("http://localhost:3000/ 라우팅 메소드의 콜백함수가 호출됨.");

  console.log("사용자 클라이언트 정보를 req(HttpRequest) 객체에서 조회 가능함.", req);
  
  //테스트 쿼리스트링 아이디 값 추출 (URL을 통해 데이터 저장)
  //http://localhost:3000/?id=testing&stock=2 
  const testId = req.query.id;
  const stock = req.query.stock;

  console.log("URL QueryString방식으로 전달된 데이터 출력 :", testId, stock);

  console.log("서버 측에서 웹브라우저를 응답 처리하기 위한 res(HttpResponse) 객체 조회", res);

  console.log("res.render() 메소드를 통해 메인 뷰파일(index.ejs)이 바로 호출됨.")

  //서버에서 사용자 웹브라우저로 응답 결과물을 반환됨.
  //지정된 뷰파일 내 웹페이지가 반환됨.
  //res.render('뷰파일 경로', 뷰파일에 전달하는 JSON 데이터);
  res.render('index.ejs', { title: '홈페이지' });
});


/*
회원가입 웹페이지 요청과 응답처리 라우팅 메소드
- router.get('호출주소 체계 url', 콜백함수())
- 콜백함수는 해당 라우팅 메소드가 호출되면 서버에서 응답 처리하기 위한 함수가 자동 실행
- 콜백함수가 서버에서 응답 처리해야 하는 기능 구현하는 영역
- 호출주소 : http://localhost:3000/entry
*/
router.get('/entry', function(req, res){
  //res.render() 메소드는 서버에서 지정한 뷰파일을 웹브라우저로 전달 메소드
  //res.render('지정한 경로 포함 뷰파일명', 뷰파일에 전달한 데이터)
  //views 폴더 내에 entry.ejs 파일 내 html 웹페이지를 웹브라우저에 전달함.
  res.render('entry.ejs');
});


/*
로그인 웹페이지 요청과 응답처리 라우팅 메소드
- 호출주소 : http://localhost:3000/login
*/
router.get('/login', function(req, res){
  //서버에서 응답 처리할 기능 구현
  //view 폴더 내에 login.ejs 파일 내 html 웹페이지를 웹브라우저에 전달함.
  res.render('login.ejs');
});


module.exports = router;
