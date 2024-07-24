//npm start --> bin/www.js 실행(웹 서버/서비스 환경 구성) --> app.js 실행 --> routing 모듈 호출 --> 라우팅 메소드 호출 --> Model 또는 View 파일 호출 반환

//에러 처리를 위한 객체 참조 (중요하지 않음)
var createError = require('http-errors');

//node express 웹 어플리케이션 객체 생성
var express = require('express');

//서버 상의 물리적 경로 관리 내장 모듈
var path = require('path');

//쿠키 정보를 파싱해주는 객체 참조
var cookieParser = require('cookie-parser');

//서버 측에서 전문 로길 처리를 mornan 로거 참조 (잘 사용하지 않음)
var logger = require('morgan');

//각종 사용자 요청과 응답 처리해주는 라우터(라우팅 파일) 참조 (가장 중요함)
//라우터 파일 별로 라우터 객체 참조

//전체 공통 라우터 파일
var indexRouter = require('./routes/index');

//샘플 라우터 파일로 사용자 정보(웹페이지) 요청과 응답 예시 샘플 제공
var usersRouter = require('./routes/users');

//express 메소드를 호출하여 ndoe app 객체 생성
var app = express();

//생성된 노드 백엔드 앱에서 각종 설정들을 set 메소드를 통해 설정
//view engine setup
//__dirname은 현재 모듈(app.js)의 물리적 파일 경로 변환
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use() 메소드를 통해 특정 기능 사용 추가
//노드 앱에 logger 기능 추가
app.use(logger('dev'));

//노드 앱에 json 반환 기능 추가
app.use(express.json());

//기타 추가 기능 정의
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//상단에서 참조한 라우터 파일들의 기본 호출주소 체계 정의 (가장 중요함)
//routes/index.js 라우터 파일은 http://localhost:3000/를 기본 주소로 설정함
app.use('/', indexRouter);

//routes/users.js 라우터 파일의 기본 호출주소 체계 정의 (가장 중요함)
//routes/users.js 라우터 파일은 http://localhost:3000/users를 기본 주소로 설정함
app.use('/users', usersRouter);

//catch 404 and forward to error handler
//404 에러 처리를 위한 미들웨어 메소드
//200 : 서버 요청에 정상 응답, 400 : 서버에 요청했지만 서버에 요청 리소스가 없음. (client)
//500 : 서버 요청을 했지만 서버에서 처리하다가 서버 에러 발생 코드 반환 (server)
app.use(function(req, res, next) {
  //각종 비정상적인 요청에 대한 404 웹페이지 반환 처리 기능 제공
  next(createError(404));
});

//error handler
//500 서버 측 에러에 대한 전역 예외 처리기
app.use(function(err, req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.js 모듈 내의 app 객체를 반환함. (핵심)
module.exports = app;
