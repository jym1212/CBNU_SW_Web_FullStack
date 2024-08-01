var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//2024.07.30
//환경 설정 파일 구성
require('dotenv').config();


//2024.08.01
//RESTful API 서비스 CORS 이슈 해결을 위한 cors 패키지 참조
const cors = require('cors');


//2024.07.26
//레이아웃 노드 패키지 참조
var expressLayouts = require('express-ejs-layouts');

//2024.07.30
//ORM Model 영역의 sequelize(DB 연결 객체) 속성 참조
var sequelize = require('./models/index.js').sequelize;


//2024.07.26
//라우터 참조
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin');      //관리자 계정 관리 라우터
var articleRouter = require('./routes/article');  //게시글 정보 관리 라우터
var channelRouter = require('./routes/channel');  //채팅방 정보 관리 라우터
var memberRouter = require('./routes/member');    //사용자 계정 관리 라우터
var messageRouter = require('./routes/message');  //채팅 메세지 관리 라우터


var app = express();


//MySQL과 자동 연결 처리, 모델 기반 물리 테이블 생성 처리 제공
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//모든 웹사이트/모바일 프론트에서 REST API를 접근할 수 있게 허락함.
app.use(cors());


//2024.07.26
//모든 뷰파일에 적용되는 레이아웃 뷰파일 설정
app.set('layout', 'layout');            //전체 레이아웃 파일 지정
app.set("layout extractScripts", true); //script 태그를 추출하여 레이아웃 파일의 해당 위치에 삽입
app.set("layout extractStyles", true);  //style 태그를 추출하여 레이아웃 파일의 해당 위치에 삽입
app.set("layout extractMetas", true);   //meta 태그를 추출하여 레이아웃 파일의 해당 위치에 삽입
app.use(expressLayouts);                //노드 앱에 레이아웃 기능 추가 적용


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//기본 호출 주소 체계 정의
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/admin', adminRouter);     //http://localhost:5001/admin
app.use('/article', articleRouter); //http://localhost:5001/article
app.use('/channel', channelRouter); //http://localhost:5001/channel
app.use('/member', memberRouter);   //http://localhost:5001/member
app.use('/message', messageRouter); //http://localhost:5001/message


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
