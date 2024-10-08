//2024.07.26
//게시글 정보 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//게시글 정보 목록, 등록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();

//moment 패키지 참조
var moment = require('moment');


//2024.07.30
//ORM DB 객체 참조
var db = require('../models/index.js');

//동적 SQL 쿼리를 직접 작성해서 전달하기 위한 참조
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;


//2024.08.02
//관리자 로그인 여부 체크 미들웨어 함수 참조
const { inLoggined } = require('./sessionMiddleware.js');


//파일 업로드를 위한 multer 패키지 참조
var multer = require('multer');

//파일 저장 위치 지정
var storage = multer.diskStorage({

    //파일 저장 위치
    destination(req, file, cb) {
        cb(null, 'public/upload/');
    },

    //서버에 저장되는 파일명
    filename(req, file, cb) {
        cb(null, `${Date.now()}__${file.originalname}`);
    },
});

//일반 업로드 처리 객체 생성
var upload = multer({ storage: storage });


/* 
게시글 정보 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/list
- 호출 방식 : Get 방식
- 응답 결과 : 게시글 목록 웹페이지 반환
*/
router.get('/list', inLoggined, async (req, res, next) => {

    //Step1 : 게시글 목록 조회 옵션 데이터 정의
    const searchOption = {
        title: "",
        contents: "",
        is_display_code: "9"
    };

    //Step2 : DB 게시글 테이블에서 전체 게시글 정보 조회
    const articles = await db.Article.findAll();

    //Step3 : DB에서 조회된 전체 게시글 정보를 뷰파일에 전달 후 반환
    res.render('article/list', { moment, articles, searchOption });
});


/* 
게시글 정보 목록 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/list
- 호출 방식 : Post 방식
- 응답 결과 : 게시글 조회 옵션 결과 웹페이지 반환
*/
router.post('/list', inLoggined, async (req, res, next) => {

    //Step1 : 사용자가 입력한 조회 옵션 데이터 추출
    const title = req.body.title;
    const contents = req.body.contents;
    const is_display_code = req.body.is_display_code;

    //Step2 : DB 게시글 테이블에서 해당 게시글 정보 조회
    //동적 SQL 쿼리를 사용하여 사용자가 입력한 조회 옵션에 따라 데이터 조회
    let query = `SELECT 
        article_id,
        title,
        contents,
        board_type_code,
        article_type_code,
        view_count,
        is_display_code,
        reg_date
    FROM article
    WHERE article_id > 0`;

    //제목 추가 필터 조건
    if (title.length > 0) {
        query += ` AND title like '%${title}%' `;
    }

    //내용 추가 필터 조건
    if (contents.length > 0) {
        query += ` AND contents like '%${contents}%' `;
    }

    //게시 여부 추가 필터 조건
    if (is_display_code != 9) {
        query += ` AND is_display_code = ${is_display_code} `;
    }
        
    query += ' ORDER BY reg_date DESC;';

    //SQL 쿼리 수행
    const articles = await sequelize.query(query, {
        raw: true,
        type: QueryTypes.SELECT
    });

    //Step3 : 조회 옵션 기본 값을 사용자가 입력/선택한 값으로 저장하여 뷰파일에 전달
    const searchOption = {
        title: title,
        contents: contents,
        is_display_code: is_display_code
    };

    //Step4 : DB에서 조회된 해당 게시글 정보를 뷰파일에 전달 후 반환
    res.render('article/list', { moment, articles, searchOption });
});


/*
신규 게시글 정보 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/create
- 호출 방식 : Get 방식
- 응답 결과 : 신규 게시글 등록 웹페이지 반환
*/
router.get('/create', inLoggined, async (req, res, next) => {

    //신규 게시글 등록을 위한 웹페이지 반환
    res.render('article/create');
})


/*
신규 게시글 데이터 등록 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/create
- 호출 방식 : Post 방식
- 응답 결과 : 신규 게시글 DB 등록 처리 후 목록 웹페이지로 이동
*/
router.post('/create', inLoggined, upload.single('file'), async (req, res, next) => {
    
    //Step1 : 신규 게시글 등록 폼에서 사용자가 입력/선택한 값 추출
    const title = req.body.title;
    const contents = req.body.contents;
    const board_type_code = req.body.board_type_code;
    const article_type_code = req.body.article_type_code;
    const is_display_code = req.body.is_display_code;

    //Step2 : 첨부파일이 있는 경우 파일 업로드 처리
    //폼에서 file 태그에 파일을 첨부하면 req.file 속성으로 서버에 업로드된 파일 추출
    const uploadFile = req.file;

    //Step3 : DB 게시글 테이블에 저장할 JSON 데이터 생성
    const article = {
        title,
        contents,
        board_type_code,
        article_type_code,
        is_display_code,
        ip_address: "111.111.111.111",
        view_count: 0,
        reg_date: Date.now(),
        reg_member_id : 1
    };

    //Step4 : DB 게시글 테이블에 신규 게시글 데이터 등록 처리
    const registedArticle = await db.Article.create(article);
    console.log("실제 DB article 테이블에 저장된 데이터 :", registedArticle);

    //Step5 : 신규 등록 게시글 고유번호를 기반으로 첨부파일 정보 등록
    //업로드한 파일이 있는 경우에만 파일 정보 등록 처리
    if (uploadFile) {
        
        const filePath = `/upload/${uploadFile.filename}`;  //실제 서버에 업로드된 파일 경로 
        const fileName = uploadFile.filename;               //서버에 업로드된 파일명 (3234433_a.png)
        const originalFileName = uploadFile.originalname;   //사용자가 업로드한 파일명 (a.png)
        const fileSize = uploadFile.size;                   //파일 크기 (byte)
        const mimeType = uploadFile.mimetype;               //파일 MIME 타입 (image/png)

        //파일 정보를 DB에 저장할 JSON 데이터 생성
        const file = {
            article_id: registedArticle.article_id,
            file_name: fileName,
            file_size: fileSize,
            file_path: filePath,
            file_type: mimeType,
            reg_date: Date.now(),
            reg_member_id: 1
        };

        //파일 첨부 데이터를 DB 게시글 파일 테이블에 저장
        await db.ArticleFile.create(file);
    }


    //Step6 : 등록 완료 후 게시글 목록 웹페이지로 이동
    res.redirect('/article/list');
})


/*
기존 게시글 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/delete?id=1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 게시글 DB 데이터 삭제 처리 후 목록 웹페이지로 이동
*/
router.get('/delete', inLoggined, async (req, res, next) => {

    //Step1 : URL 주소에서 삭제할 게시글 고유번호 추출
    const articleIdx = req.query.id;

    //Step2 : DB 게시글 테이블에서 해당 게시글 데이터 삭제 처리
    const deletedCnt = await db.Article.destroy({ where: { article_id: articleIdx } });

    //Step3 : 삭제 완료 후 게시글 목록 웹페이지로 이동
    res.redirect('/article/list');
})


/*
기존 게시글 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://locathost:5001/article/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정된 게시글 DB 데이터 수정 처리 후 목록 웹페이지로 이동
*/
router.post('/modify', inLoggined, async (req, res, next) => {
    
    //Step1 : 게시글 수정 데이터를 추출하고, 수정할 데이터 소스 생성
    const articleIdx = req.body.article_id;

    const title = req.body.title;
    const contents = req.body.contents;
    const board_type_code = req.body.board_type_code;
    const article_type_code = req.body.article_type_code;
    const is_display_code = req.body.is_display_code;

    //Step2 : DB 게시글 테이블에 수정할 JSON 데이터 생성
    const article = {
        title,
        contents,
        board_type_code,
        article_type_code,
        is_display_code,
        edit_date: Date.now(),
        edit_member_id: 2
    };

    //Step3 : DB 게시글 테이블에 해당 게시글 정보 수정
    const updatedCnt = await db.Article.update(article, { where: { article_id: articleIdx } });

    //Step4 : 수정 완료 후 게시글 목록 웹페이지로 이동
    res.redirect('/article/list');
})


/*
기존 게시글 데이터 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : 기존 게시글 정보가 포함된 수정 웹페이지 제공
*/
router.get('/modify/:id', inLoggined, async (req, res, next) => {

    //Step1 : URL 주소에서 수정할 게시글 고유번호 추출
    const articleIdx = req.params.id;

    //Step2 : DB 게시글 테이블에서 해당 게시글 정보 조회
    const article = await db.Article.findOne({ where: { article_id: articleIdx } });
    
    //해당 게시글 첨부파일 정보 조회
    const articleFile = await db.ArticleFile.findOne({ where: { article_id: articleIdx } });

    //Step3 : DB에서 가져온 단일 게시글 정보를 뷰파일에 전달 후 반환
    res.render('article/modify', { article, articleFile });
})


module.exports = router;