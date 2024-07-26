//2024.07.26
//게시글 정보 관리 웹페이지, 데이터 처리 요청과 응답 처리 라우팅 모듈
//게시글 정보 목록, 등록, 확인(수정, 삭제) 관리 기능

var express = require('express');
var router = express.Router();

/* 
게시글 정보 목록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/list
- 호출 방식 : Get 방식
- 응답 결과 : article/list.ejs 뷰파일 반환
*/
router.get('/list', async (req, res) => {
    res.render('article/list');
});


/*
게시글 정보 등록 웹페이지 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/create
- 호출 방식 : Get 방식
- 응답 결과 : article/create.ejs 뷰파일 반환
*/
router.get('/create', async (req, res) => {
    res.render('article/create');
})


/*
신규 게시글 데이터 등록 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/create
- 호출 방식 : Post 방식
- 응답 결과 : 신규 게시글 DB 등록 처리 후 목록 페이지로 이동
*/
router.post('/create', async (req, res) => {
    res.redirect('/article/list');
})


/*
기존 게시글 데이터 수정 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://locathost:5001/article/modify
- 호출 방식 : Post 방식
- 응답 결과 : 수정된 게시글 DB 데이터 수정 처리 후 목록 페이지로 이동
*/
router.post('/modify', async (req, res) => {
    res.redirect('/article/list');
})

/*
기존 게시글 데이터 조회 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/modify/1
- 호출 방식 : Get 방식
- 응답 결과 : DB에서 해당 단일 게시글 정보를 조회하여 뷰파일에 전달 후 반환
*/
router.get('/modify/:id', async (req, res) => {
    const article_id = req.params.id;

    res.render('article/modify');
})


/*
기존 게시글 데이터 삭제 요청과 응답 처리 라우팅 메소드
- 호출 주소 : http://localhost:5001/article/delete/1
- 호출 방식 : Get 방식
- 응답 결과 : 삭제된 게시글 DB 데이터 삭제 처리 후 목록 페이지로 이동
*/
router.get('/delete/:id', async (req, res) => {
    const article_id = req.params.id;

    res.redirect('/article/list');
})

module.exports = router;