//2024.07.29
//article.js 라우터 파일의 기본 주소는 
//app.js 에서 참조 시, http://localhost:3000/article 로 설정
var express = require('express');
var router = express.Router();

//DB 프로그래밍을 위한 ORM DB 객체 참조
var db = require('../models/index.js');


/*
게시글 전체 목록 조회 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/list
- 호출 방식 : Get 방식
- 응답 결과 : 전체 게시글 목록이 포함된 웹페이지 반환
*/
router.get('/list', async (req, res) => {
    
    //Step1 : 전체 게시글 목록 조회
    const articles = await db.Article.findAll();

    //Step2 : 전체 게시글 목록이 포함된 웹페이지 반환
    res.render('article/list', {articles});
});


/*
신규 게시글 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/create
- 호출 방식 : Get 방식
- 응답 결과 : 신규 게시글 등록을 위한 웹페이지 반환
*/
router.get('/create', async (req, res) => {

    //신규 게시글 등록을 위한 웹페이지 반환
    res.render('article/create');
});


/*
신규 게시글 입력 정보 등록 처리 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/create
- 호출 방식 : Post 방식
- 응답 결과 : 신규 게시글 등록 후, 전체 게시글 목록 웹페이지로 이동
*/
router.post('/create', async (req, res) => {

    //Step1 : 신규 게시글 등록 폼에서 사용자가 입력/선택한 값 추출
    const title = req.body.title;
    const contents = req.body.contents;
    const display_code = req.body.display;

    //Step2 : article 테이블에 등록할 JSON 데이터 생성
    //주의 : 반드시 JSON 데이터 속성명은 article.js 모델의 속성명과 일치해야 함.
    //주의 : NN(NotNull) 속성에 대한 값은 반드시 입력되어야 함.
    const article = {
        board_type_code : 1,
        title: title,
        article_type_code: 0,
        contents: contents,
        view_count: 0,
        ip_address: "222.222.222.222",
        is_display_code: display_code,
        reg_date: new Date(),
        reg_member_id: 2
    }

    //Step3 : 신규 게시글 데이터를 article 테이블에 저장
    //create() 메소드는 ORM Framework에 의해 INSERT INTO article() values () 쿼리로 변환
    //그 후, DB 서버에 전송되어 DB 서버에서 실행되고, 저장된 단일 게시글 데이터가 DB 서버에서 반환
    const registedArticle = await db.Article.create(article);

    console.log("실제 DB article 테이블에 저장된 데이터 :", registedArticle);
    
    //Step4 : 신규 게시글 DB 등록 처리 후, 목록 페이지로 이동
    res.redirect('/article/list');
});


/*
기존 단일 게시글 정보 삭제 처리 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/delete?id=1
- 호출 방식 : Get 방식
- 응답 결과 : 기존 단일 게시글 정보 삭제 후, 전체 게시글 목록 웹페이지로 이동
*/
router.get('/delete', async (req, res) => {

    //Step1 : 삭제할 게시글 고유번호 추출
    const articleIdx = req.query.article_id;

    //Step2 : 기존 단일 게시글 정보 삭제 처리
    //삭제된 데이터 건수가 결과값으로 반환
    const deletedCnt = await db.Article.destroy({ where: { article_id: articleIdx } });

    console.log("삭제된 게시글 건수 :", deletedCnt);

    //기존 단일 게시글 DB 삭제 처리 후, 목록 페이지로 이동
    res.redirect('/article/list');
});


/*
기존 단일 게시글 정보 수정 처리 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/modify
- 호출 방식 : Post 방식
- 응답 결과 : 기존 단일 게시글 정보 수정 후, 전체 게시글 목록 웹페이지로 이동
*/
router.post('/modify', async (req, res) => {

    //Step1 : 사용자가 수정한 데이터를 추출
    const articleIdx = req.body.article_id; //게시글 고유번호는 HTML hidden 태그에서 추출
    const title = req.body.title;
    const contents = req.body.contents;
    const display_code = req.body.display;

    //Step2 : 수정된 게시글 정보 JSON 데이터 생성
    //주의 : 수정할 컬럼과 값만 지정하고, 컬럼 속성은 article.js 모델의 속성명과 일치해야 함.
    const article = {
        title,
        contents,
        is_display_code: display_code,
        ip_address: "333.333.333.333",
        edit_date: new Date(),
        edit_member_id: 3
    };

    //Step3 : 기존 단일 게시글 정보 수정 처리
    //수정된 데이터 건수가 결과값으로 반환
    const updatedCnt = await db.Article.update(article, { where: { article_id: articleIdx } });

    console.log("수정된 게시글 건수 :", updatedCnt);

    //Step4 : 기존 단일 게시글 DB 수정 처리 후, 목록 페이지로 이동
    res.redirect('/article/list');
});


/*
기존 단일 게시글 정보 조회 확인 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : 기존 단일 게시글 정보 조회 확인을 위한 웹페이지 반환
*/
router.get('/modify/:id', async (req, res) => {

    //Step1 : URL 주소에서 현재 게시글 번호 추출 (파라메터 방식)
    const articleIdx = req.params.id;

    //Step2 : DB에서 해당 게시글 번호와 일치하는 단일 게시글 정보 조회
    //SELECT * FROM article WHERE aritcle_id = 1; (articleIdx)
    //SQL 구문이 백엔드에서 만들어져서 DB 서버로 전송되어 실행되고, 그 결과를 백엔드로 반환
    const article = await db.Article.findOne({ where: { article_id: articleIdx } });

    //Step3 : DB에서 해당 게시글 번호와 일치하는 단일 게시글 정보 조회
    res.render('article/modify', {article});
});


module.exports = router;