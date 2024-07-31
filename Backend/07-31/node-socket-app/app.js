var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//2024.07.31
//RESTful API 서비스 CORS 이슈 해결을 위한 cors 패키지 참조
const cors = require('cors');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//모든 웹사이트/모바일 프론트에서 REST API를 접근할 수 있게 허락함.
app.use(cors());


//특정 도메인 주소만 접근
/* app.use(
  cors({
    method: ["GET", "POST", "DELETE", "OPTIONS"],
    origin: ["http://localhost:3000", "https://test.com"]
  })
) */


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
