//2024.08.01
//일반회원 정보 처리를 위한 각종 요청과 응답 처리 라우터
//기본 호출 주소 : http://localhost:5000/api/member
//기본 호출 주소는 app.js에서 정의

var express = require("express");
var router = express.Router();

//JWT 토큰 생성을 위한 jsonwebtoken 패키지 참조
const jwt = require("jsonwebtoken");

//ORM DB 객체 참조
var db = require("../models/index.js");

/*
전체 게시글 목록 조회 요청 및 응답처리 API 라우팅 메소드
- 호출 주소 : http//localhost:5000/api/article/list
- 요청 방식 : GET
- 응답 결과 : 전체 게시글 목록 반환
*/
router.get("/list", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const articles = await db.Article.findAll();

    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Sever Error";
  }

  res.json(apiResult);
});

/*
신규 게시글 등록 요청 및 응답처리 API 라우팅 메소드
- 호출 주소 : http//localhost:5000/api/article/create
- 요청 방식 : POST
- 응답 결과 : 등록된 단일 게시글 데이터 반환
*/
router.post("/create", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //Step0 : 프론트엔드에서 전달된 JWT 토큰값에서 사용자 정보 추출
    var token = req.headers.authorization.split("Bearer ")[1];
    console.log("게시글 등록 API token :", token);

    //사용자 토큰 정보 유효성 검사
    //정상적으로 토큰이 생성되었을 경우 토큰 내 사용자 인증 JSON 데이터 반환
    var loginMember = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    //Step1 : 프론트엔드에서 전달한 데이터 추출
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;
    const uploadFile = req.body.file;

    //Step2 : DB article 테이블에 저장할 JSON 데이터 생성
    const article = {
      title: title,
      contents: contents,
      board_type_code: 2,
      article_type_code: 0,
      view_count: 0,

      ip_address:
        //로컬 개발 환경에서는 ::1 과 같이 ip주소가 추출
        req.headers["x-forwarded-for"] || req.connection.remoteAddress,

      is_display_code: display,
      reg_date: Date.now(),

      //토큰 내 사용자 인증 데이터에서 사용자 고유번호 추출
      reg_member_id: loginMember.member_id,
    };

    //Step3 : DB article 테이블에 신규 게시글 정보 등록
    const registedArticle = await db.Article.create(article);

    //Step4 : 처리 결과 프론트엔드로 반환
    apiResult.code = 200;
    apiResult.data = registedArticle;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);
});

/*
단일 게시글 삭제 요청 및 응답처리 API 라우팅 메소드
- 호출 주소 : http//localhost:5000/api/article/delete?id=1
- 요청 방식 : GET
- 응답 결과 : 삭제된 단일 게시글 결과 반환
*/
router.get("/delete", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
  } catch (err) {}

  res.json(apiResult);
});

/*
기존 게시글 수정 요청 및 응답처리 API 라우팅 메소드
- 호출 주소 : http//localhost:5000/api/article/modify/1
- 요청 방식 : POST
- 응답 결과 : 수정된 단일 게시글 결과 반환
*/
router.post("/modify/:id", async (req, res, next) => {
  const articleIdx = req.params.id;

  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const article = await db.Article.findOne({
      where: { article_id: articleIdx },
    });

    apiResult.code = 200;
    apiResult.data = article;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);
});

/*
단일 게시글 목록 조회 요청 및 응답처리 API 라우팅 메소드
- 호출 주소 : http//localhost:5000/api/article/1
- 요청 방식 : GET
- 응답 결과 : 단일 게시글 정보 반환
*/
router.get("/:id", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const articleId = req.params.id;
    const articles = await db.Article.findOne({
      where: { article_id: articleId },
    });

    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Sever Error";
  }

  res.json(apiResult);
});

module.exports = router;
