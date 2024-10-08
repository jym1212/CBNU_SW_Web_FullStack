//2024.08.21
//채널 정보 처리를 위한 각종 요청과 응답 처리 라우터
//기본 호출 주소 : http://localhost:5000/api/channel

var express = require("express");
var router = express.Router();

// jsonwebtoken 참조
var jwt = require("jsonwebtoken");

// ORM DB 객체 참조
var db = require("../models/index");

/*
 * 전체 채널 목록 조회 요청 및 응답처리 API 라우팅 메소드
 * 호출 주소: http://localhost:5000/api/channel/list
 * 요청 방식: GET
 * 응답 결과: 전체 채널 목록 데이터
 */
router.get("/list", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const channels = await db.Channel.findAll();

    apiResult.code = 200;
    apiResult.data = channels;
    apiResult.message = "OK";
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.message = "Server Error";
  }

  res.json(apiResult);
});

/*
 * 신규 채널 등록 요청 및 응답처리 API 라우팅 메소드
 * 호출 주소: http://localhost:5000/api/channel/create
 * 요청 방식: GET
 * 응답 결과: 등록된 단일 채널 데이터
 */
router.get("/create", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //Step0 : 프론트엔드에서 전달된 JWT 토큰값에서 로그인 사용자 정보 추출
    var token = req.headers.authorization.split("Bearer ")[1];
    console.log("게시글 등록 API Token :", token);

    //사용자 토큰 정보 유효성 검사 후, 정상적이면 토큰내에 사용자인증 json 데이터를 반환
    var loginMember = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    //Step1: 프론트엔드에서 전달한 데이터 추출
    const channel_name = req.body.channel_name;
    const user_limit = req.body.user_limit;
    const channel_state_code = req.body.channel_state_code;

    //Step2: DB channel 테이블에 저장할 JSON 데이터 생성
    //Channel 모델의 속성명과 데이터 속성명을 동일하게 작성해야 한다.
    const channel = {
      community_id: 1, //소속 커뮤니티 고유번호
      category_code: 2, //채널 분류 코드 - 1: 일대일채팅 채널, 2: 그룹채팅 채널
      channel_name,
      user_limit,
      channel_state_code,
      reg_date: Date.now(),
      reg_member_id: loginMember.member_id, //Client의 토큰 내의 사용자 인증 데이터에서 사용자 고유번호 추출
    };

    //Step3: DB channel 테이블에 신규 게시글 정보 등록 처리
    const registeredChannel = await db.Channel.create(channel);

    //Step4: 처리 결과 값 프론트엔드에 반환
    apiResult.code = 200;
    apiResult.data = registeredChannel;
    apiResult.message = "OK";
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.message = "Server Error";
  }

  res.json(apiResult);
});

/* 
기존 채널 삭제 요청 및 응답처리 API 라우팅 메소드
- 호출 주소: http://localhost:5000/api/channel/delete?id=1
- 요청 방식: GET
- 응답 결과: 단일 채널 삭제 결과 데이터
*/
router.get("/delete", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    message: "",
  };
});

/* 
기존 채널 수정 요청 및 응답처리 API 라우팅 메소드
- 호출 주소: http://localhost:5000/api/channel/modify/1
- 요청 방식: GET
- 응답 결과: 단일 채널 수정 결과 데이터
*/
router.get("/modify/:id", async (req, res) => {
  const channelIdx = req.params.id;

  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const channels = await db.Channel.findOne({
      where: { channel_id: channelIdx },
    });

    apiResult.code = 200;
    apiResult.data = channels;
    apiResult.message = "OK";
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.message = "Server Error";
  }

  res.json(apiResult);
});

/*
단일 채널 목록 조회 요청 및 응답처리 API 라우팅 메소드
- 호출 주소 : http://localhost:5000/api/channel/:id
- 요청 방식 : GET
- 응답 결과 : 단일 채널 정보 데이터
*/
router.get("/:id", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const channelIdx = req.params.id;
    const channel = await db.Channel.findOne({
      where: { channel_id: channelIdx },
    });

    apiResult.code = 200;
    apiResult.data = channel;
    apiResult.message = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.message = "Server Error";
  }

  res.json(apiResult);
});

module.exports = router;
