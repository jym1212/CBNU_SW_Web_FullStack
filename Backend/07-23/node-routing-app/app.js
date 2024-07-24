var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//각종 라우터 파일 참조
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//게시 정보 처리 각종 페이지 요청과 응답처리 라우터 파일 참조
var articleRouter = require('./routes/article');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//각종 라우터 파일의 기본 호출 경로를 설정
//http://localhost:3000/
app.use('/', indexRouter);

//http://localhost:3000/users
app.use('/users', usersRouter);

//게시글 정보 웹페이지 라우터 기본 경로 설정
//http://localhost:3000/article
app.use('/article', articleRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
