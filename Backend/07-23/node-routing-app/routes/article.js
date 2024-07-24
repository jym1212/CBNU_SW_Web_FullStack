//2024.07.23
//각종 게시글 정보 관리 웹페이지 요청과 응답처리 전용 라우터 파일
//artile.js 라우터 파일의 기본 주소 체계는 app.js 내에서 http://localhost:3000/article로 정의

//express 객체 참조
var express = require('express');

//각종 요청과 응답처리를 위한 라우터 객체 참조
var router = express.Router();

/*
라우팅 메소드 정의
- router.get('호출 주소 체계', 서버 응답처리 전용 콜백함수());
- router.post('호출 주소 체계', 서버 응답처리 전용 콜백함수());
- router.put('호출 주소 체계', 서버 응답처리 전용 콜백함수());
- router.patch('호출 주소 체계', 서버 응답처리 전용 콜백함수());
- router.delete('호출 주소 체계', 서버 응답처리 전용 콜백함수());
*/


/*
게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/list
- router.get() 라우팅 메소드는 클라이언트에서 get 방식으로 요청해야 함.
- 클라이언트에서 get 방식으로 요청하는 방법 
  - 브라우저 주소창에 URL 직접 찍는 경우 <a href="/article/list"> 링크 태그를 사용자가 클릭하는 경우
*/
router.get('/list', function(req, res){
    //콜백함수(req, res, next);
    //콜백함수(req = HttpRequest 객체 = 클라이언트/웹브라우저에서 서버로 전달되는 모든 정보 제공 객체)
    //콜백함수(res = HttpResponse 객체 = 서버에서 클라이언트/웹브라우저로 응답 처리하고, 그 결과를 보내는 객체)
    //콜백함수(next = 미들웨어로 콜백처리 후에 진행할 흐름 제어 객체)

    //res.render('특정 뷰파일 경로') : 특정 지정 뷰파일의 내용들을 웹브라우저로 전달하는 메소드
    //views 폴더 아래 article 폴더 아래 list.ejs 파일을 웹브라우저로 전달
    //res.render('뷰파일 경로', 해당 지정 뷰에 전달할 데이터(JSON Data));
    res.render('article/list.ejs');
});



/*
게시글 등록 웹페이지 요청과 응답처리 라우팅 메소드 
- 호출 주소 : http://localhost:3000/article/create
- 클라이언트 요청 방식 : Get 방식
- 응답 형식 : 게시글 등록 웹페이지(뷰파일)
*/
router.get('/create', function(req, res){
    res.render('article/create.ejs');
});



/*
게시글 등록 웹페이지에서 폼 방식으로 전달해준 사용자 입력 게시글 정보를 추출하여
DB에 저장 처리하는 라우팅 메소드
- 요청 주소 : http://localhost:3000/article/create
- 클라이언트 요청 방식 : Post 방식
- ** 서버 측 라우팅 메소드는 호출 주소 URL과 클라이언트 요청 방식이 동일해야 해당 라우팅 메소드가 실행됨. **
*/
router.post('/create', function(req, res){
    //Step1 : 사용자 게시글 등록폼 태그 내 입력/선택 값 추출
    //- 사용자 입력 폼 내에 입력/선택 html 요소 태그의 값을 추출하려면
    //  req.body.thml 태그 요소의 name 속성 값을 이용하여 추출
    //- req = httpReqeust 객체 = 요청 정보를 담고 있는 클라이언트/웹브라우저에서 
    //  서버로 전달되는 모든 정보를 담고 있는 객체
    const title = req.body.title;
    const contents = req.body.contents;
    const disply = req.body.disply;

    //Step2 : DB에 저장한 JSON 데이터 생성
    //- 객체의 속성명과 속서에 할당되는 변수명이 같으면 변수명 생략 가능
    const article= {
        title,
        contents,
        display: disply,
        view_cnt: 0,
        ipaddress: "111.111.111.111",
        regist_date: Date.now(),
        regist_id: 1,
    }

    //Step3 : DB에 관련 게시글 테이블에 데이터를 저장

    //Step4 : 사용자 웹브라우저를 게시글 목록 페이지로 바로 이동
    //res.redirect('이동시키고자 하는 URL 주소 경로'); ex. http://www.naver.com
    //res.redirect('https://naver.com');
    res.redirect('/article/list');
    //== res.redirect('http://localhost:3000/article/list'); --> 같은 도메인을 사용하기에 도메인 생략 가능

    /*
    <render, redirect 차이점>
    - res.render() : 특정 뷰파일의 경로 지정을 통해 뷰파일 내용을 반환
    - res.redirect() : 사용자 웹브라우저에 특정 URL 주소 정보를 제공하여 해당 URL주소로 웹페이지
    */
});



/* 
게시글 삭제처리 요청과 응답처리 라우팅 메소드
- 요청 주소 : http://localhost:3000/article/delete
- 클라이언트 요청 방식 : Post 방식
- 응답 형식 : 삭제 후 목록 페이지로 이동 처리
*/
router.post('/delete', function(req, res){
    //Step1 : 삭제할 게시글 고유번호 추출
    const articleIdx = req.body.article_id;

    //Step2 : DB 게시글 테이블에서 해당 게시글 번호로 단일 게시글 정보를 영구 삭제

    //Step3 : 삭제 처리 후 목록 페이지로 이동
    res.redirect('/article/list');
})



/*
게시글 확인 및 수정 웹페이지 요청과 응답처리 라우팅 메소드
- 호출 주소 : http://localhost:3000/article/modify/id=1 (쿼리스트링 방식)
- 클라이언트 요청 방식 : Get 방식
- 응답 형식 : 단일 게시글 정보 확인 웹페이지(뷰파일)
*/
router.get('/modify', function(req, res){
    /* 
    URL 주소를 통해 데이터를 전달하는 방법
    1) QueryString 방식 : URL 주소에 ?키1=값&키2=값&키3=값 형식으로 데이터 전달
       - 예시 : http://shop.naver.com/category?ptype=tv&manufacture=1g&price=5000
    2) 파라메터 방식 : URL 주소 내에 데이터를 포함하여 전달
       - 예시 : http://test.co.kr/blogs/1 , http://test.co.kr/category/1/goods/2000

    (http://test.co.kr/blogs?id=1 == http://test.co.kr/blogs/1)
    - 검색 엔진 최적화(SEO)를 위해 파라메터 방식을 사용하는 것이 좋음
    */

    //Step1 : URL 주소에서 게시글 고유번호를 추출
    //쿼리스트링 방식으로 전달되는 키 값은 req.query.키명으로 추출
    const articleIdx = req.query.id;

    //Step2 : 해당 게시글 번호를 이용해 DB 게시글 테이블에서 단일 게시글 정보를 조회
    //예시 (추후 DB에서 데이터 불러옴)
    const article = {
        article_id: 1,
        title: "웹퍼블리셔의 업무에 대해 궁금해요.",
        contents: "웹퍼블리셔의 주요업무 2가지 웹 표준 준수 코딩, 웹 접근성 준수, 반응형 웹페이지 구현 ...",
        display: 1,
        view_cnt: 100,
        regist_data: "2024-07-23",
        regist_id: 1,
    }

    res.render('article/modify.ejs', {article});
    //객체의 속성명과 속성명의 변수 값이 동일하면 변수명은 생략 가능
    //== res.render('article/modify.ejs', {article:article});
});



/*
** 라우팅 메소드 구현 시, 가장 중요한 점 **
- 와일드 카드로 구현된 라우팅 메소드는 모든 라우팅 메소드의 최하단에 구현해야 함.

기존 게시글 정보에 대해 사용자가 수정한 폼 정보를 이용해 수정 데이터를 폼에서 추출하고, 
추출한 수정 정보를 기반으로 DB에 저장되어 있는 기존 데이터를 수정 처리하는 라우팅 메소드
- 관리자 웹사이트 특성상 목록 페이지로 이동
- 호출 주소 : http://localhost:3000/article/modify/1 (파라메터 방식)
- 요청 방식 : Post 방식
- 응답 형식 : 웹브라우저 주소를 목록페이지로 이동 (res.redirect())
*/
router.post('/modify/:id', function(req, res){
    
    //URL 파라메터 방식으로 데이터 전달하는 경우 해당 데이터를 URL에서 추출
    //- 먼저 라우팅 주소에 와일드 카드 키 설정 ex. modify/:id (:id가 와일드 카드 키명)

    //Step1 : 게시글 고유번호 추출 (와일드 카드 키명으로 파라메터 값 추출)
    //파라메터 방식으로 URL을 통해 데이터를 전달하는 경우 req.params.와일드카드키명으로 값 추출
    const articleIdx = req.params.id;

    //Step2 : 사용자가 수정한 HTML요소의 수정 값 추출
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    //Step3 : DB 게시글 정보에 수정을 위한 JSON 수정 데이터 생성
    const article = {
        title:title,
        contents:contents,
        display:display,
    }
    
    //Step4 : DB에 해당 단일 게시글에 대해 상기 수정 데이터로 데이터를 수정 처리

    //수정 작업이 끝나면 목록 페이지로 이동하거나(res.redirect), 특정 뷰파일을 보내줌(res.render).
    res.redirect('/article/list');
});



//반드시 라우터 파일의 라우터 객체를 exports로 노출해야 app.js 파일에서 router 내 라우팅 규칙 실행 가능함.
//** 절대 까먹으면 안 됨 (exports) **
module.exports = router;