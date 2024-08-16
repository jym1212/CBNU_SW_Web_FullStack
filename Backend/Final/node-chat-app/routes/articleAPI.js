//2024.08.01
//일반회원 정보 처리를 위한 각종 요청과 응답 처리 라우터
//기본 호출 주소 : http://localhost:5000/api/member
//기본 호출 주소는 app.js에서 정의

var express = require("express");
var router = express.Router();

//ORM DB 객체 참조
var db = require("../models/index.js");

/*
전체 게시글 목록 조회 요청 및 응답처리 API 라우팅 메소드
- 호출 주소 : http//localhost:5000/api/article/list
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

module.exports = router;
