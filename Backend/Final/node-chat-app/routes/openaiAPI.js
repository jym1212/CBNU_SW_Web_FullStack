//2024.08.20
//Open AI 정보 처리를 위한 각종 요청과 응답 처리 라우터
//기본 호출 주소 : http://localhost:5000/api/openai

var express = require("express");
var router = express.Router();

//DB 객체 참조
var db = require("../models/index");

//OpenAI API 호출을 위한 axios 패키지 참조
const axios = require("axios");

//파일 처리를 위한 file system 내장 객체 참조
const fs = require("fs");

//동적 SQL 쿼리를 직접 작성하여 전달하기 위한 sequelize 객체 참조
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

//OpenAI 객체 생성
const { OpenAI } = require("openai");
const openai = new OpenAI({ APIkey: process.env.OPENAI_API_KEY });

/*
Open AI Dalle.3 API 호출하여 프론트엔드에서 제공한 프롬포트 기반 이미지 생성 API
- 호출 주소: http://localhost:5000/api/openai/dalle
- 호출 방식: POST
- 응답 결과: 생성된 이미지 JSON 데이터 반환
*/
router.post("/dalle", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //Step1 : 프론트엔드에서 전달한 사용자 프롬포트 정보 추출
    const model = req.body.model;
    const prompt = req.body.prompt;

    //Step2 : OpenAI Dalle API 호출
    const response = await openai.images.generate({
      model: model, //이미지 처리 모델 선택 : dall-e-2, dall-e-3
      prompt: prompt, //사용자 프롬포트
      n: 1, //이미지 생성 개수 (dalle2: 최대 10개, dalle3: 1개)

      //dalle2: 256x256, 512x512, 1024x1024 지원
      //dalle3: 1024x1024, 1792x1792, 1024x1792 지원
      size: "1024x1024",

      //기본값: vivid
      //natural : 더 자연스럽고 초현실적인 이미지 생성 (dalle3만 지원)
      style: "vivid",

      //url : openai 사이트에 생성된 이미지 전체 주소 경로 반환
      //b64_json : 바이너리 데이터 형식으로 이미지 반환
      response_format: "b64_json",
    });

    //Step3 : Dalle API 호출 결과에서 물리적 이미지 생성 후, 서버 공간에 저장
    //url 방식으로 이미지 생성 값을 반환받는 경우, 1시간 이후 OpenAI 이미지 서버에 해당 이미지 삭제
    //해당 이미지가 영구적으로 필요하면, 반환된 url 주소를 이용해 백엔드에 생성
    //const imageURL = response.data[0].url;

    //이미지 경로를 이용해 물리적 이미지 파일 생성
    const imgFileName = `sample-${Date.now()}.png`;
    const imgFilePath = `./public/ai/${imgFileName}`; //로컬 이미지 저장 위치

    //이미지 생성 요청에 대한 응답 값으로 이미지 바이너리 데이터로 반환 후,
    //서버에 이미지 파일 생성
    const imageBinaryData = response.data[0].b64_json;
    console.log("이미지 바이너리 데이터 정보 :", imageBinaryData);

    const buffer = Buffer.from(imageBinaryData, "base64");
    fs.writeFileSync(imgFilePath, buffer);

    /* axios({
      url: imageURL,
      responseType: "stream",
    })
      .then((response) => {
        response.data
          .pipe(fs.createWriteStream(imgFilePath))
          .on("finish", () => {
            console.log("이미지 생성 완료");
          })
          .on("error", (err) => {
            console.error("이미지 생성 에러 :", err);
          });
      })
      .catch((err) => {
        console.error("Error downloading image:", err);
      }); */

    // Step4: 최종 생성도니 이미지 데이터 추출
    const article = {
      title: model,
      contents: prompt,
      board_type_code: 3, // 게시판 고유번호 - 3: AI 이미지 게시판
      article_type_code: 0,
      view_count: 0,
      ip_address:
        req.headers["x-forwarded-for"] || req.connection.remoteAddress, // 사용자 IP 추출 -> 로컬 개발 환경인 경우 ::1로 나올 수 있다.
      is_display_code: 1,
      reg_date: Date.now(),
      reg_member_id: 1, // 추후 JWT 토큰에서 사용자 고유번호를 추출하여 처리
    };

    //신규 등록된 게시글 정보 반환
    const registedArticle = await db.Article.create(article);

    //생성된 이미지 정보 생성 후 저장
    const imageFullPath = `${process.env.DALLE_IMG_DOMAIN}/ai/${imgFileName}`;

    const articleFile = {
      article_id: registedArticle.article_id,
      file_name: imgFileName,
      file_size: 0, // 추후 변경
      file_path: imageFullPath, // 도메인 주소를 포함한 백엔드 이미지 전체 url 경로 (public 폴더는 도메인 주소를 통해 바로 접근 가능)
      file_type: "PNG",
      reg_date: Date.now(),
      reg_member_id: 1, // 추후 변경 (생성한 article에 저장된 reg_member_id와 동일해야 하며, DB에 존재하는 사용자 고유번호여야 함.)
    };

    // Step5: DB 게시글 테이블에 사용자 이미지 생성요청 정보 등록처리
    const registedFile = await db.ArticleFile.create(articleFile);

    // Step6: 최종 생성된 이미지 정보를 프론트엔드로 반환
    apiResult.code = 200;
    apiResult.data = imageFullPath;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  //최종 결과 값을 프론트엔드로 반환
  res.json(apiResult);
});

/*
생성된 이미지 목록 정보 요청 및 응답 처리 API 라우팅 메소드
- 호출 주소: http://localhost:5000/api/openai/all
- 호출 방식: GET
- 응답 결과: board_type_code가 3인 게시글, 파일 정보 조회 및 반환
*/
router.get("/all", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  //3개의 테이블에서 원하는 데이터를 가져와 JOIN 처리
  //흩어져 있는 데이터를 하나로 합쳐서 반환
  //각 테이블 article: A, article_file: F, member: M 지칭
  //AS: article_file_id를 file_id로 가져옴.
  try {
    //ON 키워드 : JOIN절과 함께 사용되어 두 테이블 간 조인 조건 지정
    //JOIN 조건에 사용되는 열은 각 테이블에서 PK 또는 FK로 지정
    //NNER JOIN: 각 테이블에 모두 존재하는 데이터만 가져옴.

    const query = `SELECT
            A.article_id,
            A.title,
            A.contents,
            A.reg_member_id,
            F.article_file_id AS file_id,
            F.file_name,
            F.file_path,
            M.name AS reg_member_name
            FROM article A INNER JOIN article_file F
            ON A.article_id = F.article_id
            INNER JOIN member M ON A.reg_member_id = M.member_id
        WHERE A.board_type_code = 3; `;

    const blogFiles = await sequelize.query(query, {
      raw: true,
      type: QueryTypes.SELECT,
    });

    apiResult.code = 200;
    apiResult.data = blogFiles;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  //최종 결과 값을 프론트엔드로 반환
  res.json(apiResult);
});

/*
ChatGPT-4o 기반 질의응답 처리 API 라우팅 메소드
- 호출 주소: http://localhost:5000/api/openai/gpt
- 호출 방식: POST
- 응답 결과: ChatGPT-4o 기반 응답 메세지 결과 반환
*/
router.get("/gpt", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //Step1: 프론트엔드에서 사용자 질문 프롬프트 추출
    const prompt = req.body.message;

    //Step2: ChatGPT API 호출
    //서버와 gpt는 실시간 연결이 아니라, RESTful API와 통신하여 요청과 응답 처리
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o", // 지원 LLM 모델 : gpt-4o-mini, gpt-4o, gpt-4, gpt-3.5-turbo
        message: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    //Step3: ChatGPT 응답 메시지 추출
    const gptMessage = resonse.data.choices[0].message[0].content;

    //Step4: 프론트엔드에 ChatGPT 응답 메시지 반환
    apiResult.code = 200;
    apiResult.data = gptMessage;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  //최종 결과 값을 프론트엔드로 반환
  res.json(apiResult);
});

module.exports = router;
