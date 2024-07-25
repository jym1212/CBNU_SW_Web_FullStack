//2024.07.24
//articleAPI.js 라우터의 기본 주소는 app.js에서 http://localhost:3000/api/articles로 설정
var express = require('express');
var router = express.Router();

/*
전체 게시글 목록 데이터 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/api/articles/list
- 호출 방식 : Get 방식
- 응답 결과 : 게시글 JSON 데이터 목록
*/
//router.get('호출 주소', 콜백함수(){...});
//async(req, res)=>{...} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그램 가능 
//콜백 함수는 콜백 지옥 문제가 발생할 수 있으므로 async, await 사용하여 비동기 처리
router.get('/list', async (req, res) => {

    //RESTful API 데이터 처리 패턴
    //API 호출 결과 표준 데이터 포맷 정의 
    let apiResult = {
        code: 200,
        data: null,
        result: ""
    }

    //백엔드 예외 처리
    //try ~ catch 구문을 사용하여 에러가 발생하면 catch 블럭으로 이동하여 에러 처리
    try {
        //DB 게시글 테이블에서 전체 게시글 목록을 가져왔다고 가정
        const articles = [
            {
                article_id: 1,
                title: "게시글 제목1 입니다.",
                contents: "게시글1 내용입니다.",
                display: 1,
                view_cnt: 10,
                ip_address: "111.111.111.111",
                regist_id: 1,
                regist_date: Date.now()
            },
            {
                article_id: 2,
                title: "게시글 제목2 입니다.",
                contents: "게시글2 내용입니다.",
                display: 0,
                view_cnt: 20,
                ip_address: "222.222.222.222",
                regist_id: 2,
                regist_date: Date.now()
            },
            {
                article_id: 3,
                title: "게시글 제목3 입니다.",
                contents: "게시글3 내용입니다.",
                display: 0,
                view_cnt: 30,
                ip_address: "333.333.333.333",
                regist_id: 3,
                regist_date: Date.now()
            }
        ];

        apiResult.code = 200;
        apiResult.data = articles;
        apiResult.result = "OK";

    } catch (err) {
        apiResult.code = 500;
        apiResult.data = null;

        //error 메세지(err.message)를 직접 넣지 않음. (보안상 문제)
        apiResult.result = "Failed Server Error (관리자에게 문의하세요.)";
    }

    //서버 응답 결과물로 순수 json 데이터 반환
    //res.json(json 데이터);
    res.json(apiResult);
});


/*
- Get 방식 : packet 전송 시, header에 데이터가 포함되어 전송하기에 데이터가 노출되어 보안에 취약
- Post 방식 : packet 전송 시, body에 데이터가 포함되어 전송하기에 데이터가 노출되지 않아 보안에 강함.
  (Get 방식은 데이터 양이 적을 때 사용하며, Post 방식은 데이터 양이 많을 때 사용)

- http : 웹 서버와 클라이언트 간의 통신 규약
- https : http에 보안 기능이 추가(SSL)되어 데이터가 암호화되어 전송
*/


/*
단일 신규 게시글 정보 등록 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/api/articles/create
- 호출 방식 : Post 방식
- 응답 결과 : 등록 처리 완료된 단일 게시글 정보 반환
*/
//Postman에서 Test하여 Debugging을 해보며, 실제 서버에 데이터가 저장되는지 확인하고 에러 확인
router.post('/create', async (req, res) => {

    //RESTful API 데이터 처리 패턴
    //API 호출 결과 표준 데이터 포맷 정의 
    let apiResult = {
        code: 200,
        data: null,
        result: ""
    }

    //백엔드 예외 처리
    try {
        //Step1 : 클라이언트에서 보내준 사용자 입력 json 데이터를 추출
        //req.body는 클라이언트에서 보내준 단일 게시글 json 객체의 속성명
        const title = req.body.title;           //글 제목
        const contents = req.body.contents;     //글 내용
        const display = req.body.display;       //게시 여부

        //Step2 : 사용자 json 데이터를 DB 게시글 테이블에 저장
        //DB 게시글 테이블에 저장할 JSON 단일 데이터
        const article = {
            article_id: 1,
            title: title,
            contents: contents,
            display: display,
            view_cnt: 0,
            ip_address: "111.111.111.111",
            regist_id: 1,
            regist_date: Date.now()
        }

        //DB 게시글 테이블에 상기 데이터를 저장
        //저장하면 DB에 저장된 게시글 정보가 다시 반환됨. (게시글 번호가 포함)

        //Step3 : DB에 저장되고 반환되어 등록된 신규 게시글 정보가 반환
        const dbArticle = {
            article_id: 1,
            title: title,
            contents: contents,
            display: display,
            view_cnt: 0,
            ip_address: "111.111.111.111",
            regist_id: 1,
            regist_date: Date.now()
        }

        apiResult.code = 200;
        apiResult.data = dbArticle;
        apiResult.result = "OK";

    } catch (err) {
        //try{ } 블록스코프 내에서 에러가 발생하면 catch(error){ } 블럭으로 에러 내용이 전달
        apiResult.code = 500;
        apiResult.data = null;

        //error 메세지(err.message)를 직접 넣지 않음. (보안상 문제)
        apiResult.result = "관리자에게 문의하세요. (Server Error)";
    }

    //Step4 : DB에 저장되고 반환된 단일 게시글 정보를 클라이언트에 반환
    //HttpResponse 객체의 json('json 데이터') 메소드는 서버에서 웹브라우저로 json 데이터를 반환
    res.json(apiResult);
});

module.exports = router;