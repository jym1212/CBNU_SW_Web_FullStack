var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//2024.07.24
//게시글 정보 처리 전용 RESTful API 라우터 참조
var articleAPIRouter = require('./routes/api/articleAPI');

//노드 백엔드 어플리케이션 객체 정의
var app = express();


//2024.07.25
//전역 노드 어플리케이션 미들웨어 구현 실습
//app.use(노드 앱에 추가하고 싶은 기능 정의);
app.use(function (req, res, next) {

  //모든 사용자의 요청이 있을 때마다 실행되어야 하는 기능 구현
  console.log("전역 어플리케이션 미들웨어 함수 호출 ", Date.now());

  //원래 사용자가 요청했거나 응답해야 하는 다음 프로세스로 이동
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//미들웨어 함수 정의
//각종 라우터에 대한 요청, 라우터 메소드에 대한 요청 처리
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//특정 호출 주소에 대한 미들웨어 기능 구현
//만약 사용자가 http://localhost:3000/user/eddy 라는 주소를 요청하면
//해당 주소를 분석하여 관련 응답을 미들웨어에서 매번 처리
app.use('/user/:id', function (req, res, next) {

  const uid = req.params.id;
  if (uid == "eddy") {
    console.log("현재 사용자에 대한 정보 요청 :", uid);

    //res.send() : 브라우저에게 응답을 전송하는 함수 (만능 함수)
    res.send("시스템에 접근할 수 없는 사용자입니다.");
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);



//articleAPIRouter의 기본 호출 주소 체계 정의
//http://localhost:3000/api/articles
app.use('/api/articles', articleAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
