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


/* RESTful API 규칙
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




//2024.07.25
/*
기존 단일 게시글 정보 조회 요청과 응답 처리 라우팅 메소드 (쿼리스트링 방식)
- 호출 주소 : http://localhost:3000/api/articles/?aid=1
- 호출 방식 : Get 방식
- 응답 결과 : 단일 게시글 정보 JSON 반환
*/
router.get('/', async (req, res) => {

    //RESTful API 데이터 처리 패턴
    //API 호출 결과 표준 데이터 포맷 정의 
    let apiResult = {
        code: 200,  //처리결과 상태 코드
        data: null, //반환할 데이터가 있으면 여기에 전달함.
        result: ""  //서버에서 프론트로 특정 메세지를 여기에 전달함.
    }

    //백엔드 예외 처리
    try {
        //Step1 : API URL 주소에서 게시글 번호를 추출 (쿼리스트링 방식)
        //쿼리스트링 방식으로 전달되는 키 값은 req.query.키명으로 추출
        const articleIdx = req.query.aid;

        //Step2 : 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일 게시글 정보를 조회
        //DB에서 조회해온 단일 게시글 정보
        const article = {
            article_id: 1,
            title: "쿼리스트링 방식입니다.",
            contents: "쿼리스트링 방식 내용입니다.",
            display: 1,
            view_cnt: 10,
            ip_address: "111.111.111.111",
            regist_id: 1,
            regist_date: Date.now()
        };

        apiResult.code = 200;
        apiResult.data = article;
        apiResult.result = "OK";

    } catch (err) {

        console.log("실제 서버 에러 확인 :", err.message);
        //백엔드에서 에러가 발생하면 서버에 물리적 로그 폴더를 만들고 로그.txt(.log) 파일에
        //기록하면 조금 더 적극적으로 서버 에러에 대한 대응이 가능함.

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "관리자에게 문의하세요. (Server Error)";
    }

    //Step3 : 단일 게시글 정보를 웹브라우저/클라이언트 응답 결과물로 반환
    res.json(apiResult);
});


/* RESTful API 규칙
- Post, Put, Patch 방식은 데이터를 서버로 전송할 때 사용
- Post 방식은 데이터를 등록할 때 사용
- Put 방식은 데이터를 수정할 때 사용하는데, 전체 데이터를 수정할 때 사용
- Patch 방식은 데이터를 수정할 때 사용하는데, 일부 데이터를 수정할 때 사용
*/


/*
기준 단일 게시글 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/api/articles/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정 처리 완료된 단일 게시글 정보 JSON 반환
*/
router.post('/modify', async (req, res) => {

    //RESTful API 데이터 처리 패턴
    //API 호출 결과 표준 데이터 포맷 정의 
    let apiResult = {
        code: 200,
        data: null,
        result: ""
    }

    //백엔드 예외 처리
    try {
        //Step1 : 클라이언트에서 보내준 사용자 수정 json 데이터를 추출
        //req.body는 클라이언트에서 보내준 단일 게시글 json 객체의 속성명
        //수정할 게시글 고유번호를 추출
        const article_id = req.body.article_id; //게시글 고유번호
        const title = req.body.title;           //글 제목
        const contents = req.body.contents;     //글 내용
        const display = req.body.display;       //게시 여부

        //Step2 : 사용자가 보내준 속성만 해당 테이블의 column값으로 수정
        //DB 게시글 테이블에 수정할 JSON 단일 데이터
        const article = {
            title: title,
            contents: contents,
            display: display,
            ip_address: "111.111.111.111",
            modify_id: 1,
            modify_date: Date.now()
        }

        /* 
        - Database에는 여러 개의 table이 존재하고, 각 table은 여러 개의 column으로 구성
        - Frontend에서 REST API로 데이터를 요청하면, Backend에서는 Database에 접근하여 데이터를 가져옴.
        - Database의 CRUD는 Insert(Create), Select(Read), Update(Update), Delete(Delete)로 구성
        - Insert로 데이터를 등록하면 Database에 데이터가 저장되고, 등록 데이터를 반환해줌.
        - Update로 데이터를 수정하면 Database에 데이터가 수정되고, 수정 건수를 반환해줌.
        */

        //Step3 : 수정된 건수를 data 값으로 지정해주고 프론트에 수정된 건수 전달
        //DB 게시글 테이블에 상기 데이터를 수정
        //수정하면 DB에 수정된 건수를 반환해줌.

        apiResult.code = 200;
        apiResult.data = 1; //실제 DB서버에서 제공된 수정된 건수
        apiResult.result = "OK";

    } catch (err) {
        //try{ } 블록스코프 내에서 에러가 발생하면 catch(error){ } 블럭으로 에러 내용이 전달
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result = "관리자에게 문의하세요. (Server Error)";
    }

    //Step4 : DB에 저장되고 반환된 단일 게시글 정보를 클라이언트에 반환
    //HttpResponse 객체의 json('json 데이터') 메소드는 서버에서 웹브라우저로 json 데이터를 반환
    res.json(apiResult);
});


/*
기준 단일 게시글 삭제 요청과 응답 처리 라우팅 메소드 (:Get/URL 방식)
- 호출 주소 : http://localhost:3000/api/articles/delete?aid=1 (쿼리스트링 방식)
- 호출 방식 : Get 방식
- 응답 결과 : 삭제 처리 완료된 단일 게시글 정보 JSON 반환
*/
//"http://localhost:3000/api/articles/1"과 동일하게 인식하여, 같은 라우팅 메소드로 처리 (router.get(':aid', ...);)
// -> 와일드 카드를 사용한 메소드는 맨 아래에 위치해야 함. (1 == delete?aid=1)
router.get('/delete', async (req, res) => {

    //RESTful API 데이터 처리 패턴
    //API 호출 결과 표준 데이터 포맷 정의 
    let apiResult = {
        code: 200,  //처리결과 상태 코드
        data: null, //반환할 데이터가 있으면 여기에 전달함.
        result: ""  //서버에서 프론트로 특정 메세지를 여기에 전달함.
    }

    //백엔드 예외 처리
    try {
        //Step1 : URL에서 삭제하려는 게시글 고유번호를 조회
        const articleIdx = req.query.aid;

        //Step2 : DB 테이블에서 해당 게시글 고유번호를 기준으로 게시글 삭제

        //Step3 : DB 서버에서 특정 데이터가 삭제되면 삭제 건수가 백엔드로 반환됨.
        const deletedCount = 1; //실제 DB서버에서 제공된 삭제된 건수

        apiResult.code = 200;
        apiResult.data = deletedCount;
        apiResult.result = "OK";

    } catch (err) {
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result = "관리자에게 문의하세요. (Server Error)";
    }

    res.json(apiResult);
})


/*
기준 단일 게시글 삭제 요청과 응답 처리 라우팅 메소드 (Post 방식)
- 호출 주소 : http://localhost:3000/api/articles/delete?aid=1 (쿼리스트링 방식)
- 호출 방식 : Post 방식
- 응답 결과 : 삭제 처리 완료된 단일 게시글 정보 JSON 반환
*/
router.post('/delete', async (req, res) => {

    //RESTful API 데이터 처리 패턴
    //API 호출 결과 표준 데이터 포맷 정의 
    let apiResult = {
        code: 200,  //처리결과 상태 코드
        data: null, //반환할 데이터가 있으면 여기에 전달함.
        result: ""  //서버에서 프론트로 특정 메세지를 여기에 전달함.
    }

    //백엔드 예외 처리
    try {
        //Step1 : URL에서 삭제하려는 게시글 고유번호를 조회
        const articleIdx = req.body.article_id;

        //Step2 : DB 테이블에서 해당 게시글 고유번호를 기준으로 게시글 삭제

        //Step3 : DB 서버에서 특정 데이터가 삭제되면 삭제 건수가 백엔드로 반환됨.
        const deletedCount = 1; //실제 DB서버에서 제공된 삭제된 건수

        apiResult.code = 200;
        apiResult.data = deletedCount;
        apiResult.result = "OK";

    } catch (err) {
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result = "관리자에게 문의하세요. (Server Error)";
    }

    res.json(apiResult);
})



/*
기존 단일 게시글 정보 조회 요청과 응답 처리 라우팅 메소드 (파라메터 방식)
- 호출 주소 : http://localhost:3000/api/articles/1
- 호출 방식 : Get 방식
- 응답 결과 : 단일 게시글 정보 JSON 반환
*/
router.get('/:aid', async (req, res) => {

    //RESTful API 데이터 처리 패턴
    //API 호출 결과 표준 데이터 포맷 정의 
    let apiResult = {
        code: 200,  //처리결과 상태 코드
        data: null, //반환할 데이터가 있으면 여기에 전달함.
        result: ""  //서버에서 프론트로 특정 메세지를 여기에 전달함.
    }

    //백엔드 예외 처리
    try {
        //Step1 : API URL 주소에서 게시글 번호를 추출 (파라메터 방식)
        //파라메터 방식으로 전달되는 키값은 와일드카드(:aid) 키값을 이용해 req.params.키명으로 추출
        const articleIdx = req.params.aid;

        //Step2 : 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일 게시글 정보를 조회
        //DB에서 조회해온 단일 게시글 정보
        const article = {
            article_id: 1,
            title: "파라메터 방식입니다.",
            contents: "파라메터 방식 내용입니다.",
            display: 1,
            view_cnt: 10,
            ip_address: "111.111.111.111",
            regist_id: 1,
            regist_date: Date.now()
        };

        apiResult.code = 200;
        apiResult.data = article;
        apiResult.result = "OK";

    } catch (err) {

        console.log("실제 서버 에러 확인 :", err.message);
        //백엔드에서 에러가 발생하면 서버에 물리적 로그 폴더를 만들고 로그.txt(.log) 파일에
        //기록하면 조금 더 적극적으로 서버 에러에 대한 대응이 가능함.

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "관리자에게 문의하세요. (Server Error)";
    }

    //Step3 : 단일 게시글 정보를 웹브라우저/클라이언트 응답 결과물로 반환
    res.json(apiResult);
});

module.exports = router;