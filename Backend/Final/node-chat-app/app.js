var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//2024.08.01
//환경 설정 정보 구성
require("dotenv").config();

//2024.08.06
//웹소켓 모듈 추가
const webSocket = require("./socket");

//2024.08.01
//Sequelize ORM 이용하여 DB 서버와 연결
var sequelize = require("./models/index.js").sequelize;

//2024.07.31
//RESTful API 서비스 CORS 이슈 해결을 위한 cors 패키지 참조
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//회원정보 관리 RESTful API 라우터 참조
var memberAPIRouter = require("./routes/memberAPI");

//게시글 관리 RESTful API 라우터 참조
var articleAPIRouter = require("./routes/articleAPI");

//Open AI 관리 RESTful API 라우터 참조
var openAPIRouter = require("./routes/openaiAPI");

//채널 관리 RESTful API 라우터 참조
var channelAPIRouter = require("./routes/channelAPI");

var app = express();

//MySQL과 자동 연결 처리, 모델 기반 물리 테이블 생성 처리 제공
sequelize.sync();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//모든 웹사이트/모바일 프론트에서 REST API를 접근할 수 있게 허락함.
app.use(cors());

//특정 도메인 주소만 접근
/* app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    origin: ["http://localhost:5000", "http://127.0.0.1:5500", "http://localhost:3000", "http://localhost:3003"], //CORS 설정 주의
  })
); */

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//memberAPIRouter 기본 호출 주소 체계 정의
app.use("/api/member", memberAPIRouter);

//articleAPIRouter 기본 호출 주소 체계 정의
app.use("/api/article", articleAPIRouter);

//openAPIRouter 기본 호출 주소 체계 정의
app.use("/api/openai", openAPIRouter);

//channelAPIRouter 기본 호출 주소 체계 정의
app.use("/api/channel", channelAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/* //2024.08.06
//노드 앱의 기본 WAS 서비스 포트
app.set("port", process.env.PORT || 5000);

//노드 앱이 작동되는 서버 객체 생성
var server = app.listen(app.get("port"), function () { });

//웹소켓 express 서버와 연결
webSocket(server); */

module.exports = app;
