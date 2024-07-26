//2024.07.25
//article.js 라우터 파일은 게시글 관련 각종 웹페이지들에 대한 요청과 응답처리
//라우터 파일의 기본 호출 주소 : http://localhost:3000/article
//app.js에서 라우터 파일 참조 시, 기본 주소 설정

var express = require('express');
var router = express.Router();

//서버는 클라이언트에게 정적인 데이터(HTML, CSS, JS, 이미지 등등)를 제공
//public 폴더에 정적인 데이터 저장, views 폴더에 동적인 데이터 저장

/*
게시글 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/list
- 호출 방식 : Get 방식
- 응답 결과 : 게시글 목록 웹페이지 뷰파일 반환
*/
router.get('/list', async (req, res) => {

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

    //물리적 경로 : views/article/list.ejs
    //속성명과 변수명이 같아 변수명 생략 가능
    res.render('article/list.ejs', { articles: articles });
});


/*
신규 게시글 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/create
- 호출 방식 : Get 방식
- 응답 결과 : 게시글 등록 웹페이지 뷰파일 반환
*/
router.get('/create', async (req, res) => {
    res.render('article/create.ejs');
});


/*
신규 게시글 등록 웹페이지에서 보내준 사용자가 입력/선택한
신규 게시글 데이터 등록 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/create
- 호출 방식 : Post 방식
- 응답 결과 : 신규 게시글 DB 등록 처리 후 특정 페이지로 이동 또는 특정 뷰파일 제공
- ** 라우팅 주소와 요청 방식이 동일해야 해당 라우팅 메소드가 호출되고 실행 **
  (views/create.ejs의 <form id="createForm" action="/article/create" method="post">)
*/
router.post('/create', async (req, res) => {

    //Step1 : 사용자가 입력한 폼태그 내 입력/선택 데이터 추출
    //req.body.전달된 폼태그 내 HTML 입력/선택 요소의 name 속성명
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    //Step2 : DB 게시글 테이블에 저장할 JSON 데이터 생성
    //객체 속성명과 속성의 데이터 값 변수/상수명이 같으면 변수/상수명 생략 가능
    const article = {
        title,
        contents: contents,
        display: display,
        ip_address: "111.111.111.111",
        view_cnt: 0,
        regist_id: 1,
        regist_date: Date.now()
    };

    //Step3 : DB 게시글 테이블에 article 데이터 등록 처리
    //DB 서버에서 Insert SQL구문을 통해 DB 등록 처리가 되면 등록된 실제 데이터 set을 다시 반환
    const registedArticle = {
        title,
        contents: contents,
        display: display,
        ip_address: "111.111.111.111",
        view_cnt: 0,
        regist_id: 1,
        regist_date: Date.now()

    };

    //Step4 : 등록 완료 후 게시글 목록 웹페에지로 이동
    //redirect는 특정 URL 주소로 이동
    //http://localhost:3000/article/list
    res.redirect('/article/list');
});


/*
기존 게시글을 수정한 사용자 폼에 대한 게시글 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/modify
- 호출 방식 : Post 방식
- 응답 결과 : 기존 게시글 정보를 수정하고 목록 페이지로 이동
*/
router.post('/modify', async (req, res) => {

    //Step1 : 사용자 수정 데이터 추출하고, 수정할 데이터 소스 생성
    //수정할 대상이 되는 게시글 고유번호
    const articleIdx = req.body.article_id; //hidden 태그의 name 속성값

    //실제 수정할 데이터 항목별 값 세팅
    const article = {
        title: req.body.title,
        contents: req.body.contents,
        display: req.body.display,
        modify_id: 1,
        modify_date: Date.now()
    };

    //Step2 : DB 게시글 테이블에 특정 게시글 번호를 기준으로 게시글 정보 수정
    //- Update article Set title='수정한 제목', contents='수정한 내용', display='게시 여부값',  
    //  modify_id=1, modify_date='2024-07-25 18:08:12' WHERE article_id='게시글번호'
    
    //수정 완료 후, DB 서버에서 수정 처리 건수 반환

    //Step3 : 게시글 목록 페이지로 이동
    res.redirect('/article/list');
});

/*
기존 게시글 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/delete?aid=1
- 호출 방식 : Get 방식
- 응답 결과 : 해당 게시글 삭제 처리하고 목록 페이지로 이동
*/
router.get('/delete', async (req, res) => {

    //Step1 : req.query.키명으로 쿼리스트링 방식으로 전달된 데이터 추출
    const articleIdx = req.query.aid;

    //Step2 : DB 게시글 테이블에서 해당 게시글 데이터 삭제 처리

    //Step3 : 게시글 목록 페이지로 이동
    res.redirect('/article/list');
});


//** 파라메터 방식으로 와일드카드를 사용한 경우, 맨 밑에 정의해야 함.**
//   -> 맨 밑에 정의하지 않으면 다른 라우팅 메소드가 호출되어 오류 발생


/*
기존 등록 게시글 데이터를 조회하여 게시글 수정 웹페이지에
데이터를 포함한 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/modify/1 (파라메터 방식)
- 호출 방식 : Get 방식
- 응답 결과 : DB에서 해당 단일 게시글 정보를 조회하여 지정 뷰파일에 데이터를 전달하고,
             뷰파일 내에서 해당 데이터를 html 태그에 출력하여, 웹브라우저에 동적으로 변경된 웹페이지 반환
*/
router.get('/modify/:id', async (req, res) => {

    //Step1 : URL 주소에서 게시글 고유번호 추출
    const article_id = req.params.id;

    //Step2 : DB 게시글 테이블에서 해당 게시글 고유번호에 해당하는 단일 게시글 정보 조회
    const article = {
        article_id: 1,
        title: "게시글 제목1 입니다.",
        contents: "게시글1 내용입니다.",
        display: 1,
        view_cnt: 10,
        ip_address: "111.111.111.111",
        regist_id: 1,
        regist_date: Date.now()
    };
    
    //Step3 : DB에서 가져온 단일 게시글 정보를 modify.ejs 뷰파일에 전달
    res.render('article/modify.ejs', {article});
})

module.exports = router;