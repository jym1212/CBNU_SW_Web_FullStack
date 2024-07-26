//2024.07.25
//미들웨어 함수 정의

var express = require('express');
var router = express.Router();

//공통 기능 미들웨어 함수 참조
//middleware.js 모듈에서 제공하는 미들웨어 함수 참조
const { checkParams, checkQuery } = require('./middleware.js');


//해당 라우터 파일이 호출되면 무조건 실행되는 미들웨어 함수 정의
router.use(function (req, res, next) {
  console.log("Index.js 라우터 파일 호출될 때마다 실행되는 기능 구현");
  next();

  //res.send() 사용 시, 다음 미들웨어 함수로 이동하지 않고 다른 응답 반환
  //res.send("모든 응답 반환");
});


//특정 주소 호출에 대한 미들웨어 기능 추가
//http://localhost:3000/sample
router.use('/sample', function (req, res, next) {
  console.log("Index.js 라우터 파일 미들웨어 2 호출 :", req.originalUrl);
  next(); //다음으로 이동
}, function (req, res, next) {
  console.log("Index.js 라우터 파일 미들웨어 3 호출 :", req.method);
  res.send(req.method); //다음으로 이동하지 않고 차단
})


/* 
메인 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/
- 호출 방식 : Get 방식
- 응답 결과 : views/index.ejs 뷰파일 웹페이지 내용 응답 결과로 제공
*/
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/*
메인 웹페이지 요청과 응답 처리 라우팅 메소드 (파라메터 방식)
- 호출 주소 : http://localhost:3000/test/1
- 호출 방식 : Get 방식
- checkParams 미들웨어 요청 이후, 응답 전 먼저 실행
- router.get 메소드 실행 -> checkParams 미들웨어 함수 실행 -> 특정 로직 실행 -> 응답 콜백 함수 실행
*/
router.get('/test/:id', checkParams, async (req, res, next) => {
  res.render('index.ejs', { title: "Test" });
});

/*
메인 웹페이지 요청과 응답 처리 라우팅 메소드 (쿼리스트링 방식)
- 호출 주소 : http://localhost:3000/product?category=computer&stock=100
- 호출 방식 : Get 방식
- checkQuery 미들웨어 요청 후, 응답 전 먼저 실행
- router.get 메소드 실행 -> checkQuery 미들웨어 함수 실행 -> 특정 로직 실행 -> 응답 콜백 함수 실행
*/
router.get('/product', checkQuery, async (req, res, next) => {
  res.render('index', { title: "Product" });
});

module.exports = router;
