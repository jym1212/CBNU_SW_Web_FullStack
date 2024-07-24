//users.js 라우터 파일의 기본 호출주소 체계 
//app.js에서 정의한 http://localhost:3000/users를 기본 호출주소로 설정함.
var express = require('express');
var router = express.Router();

/* GET users listing. */
//호출주소 : http://localhost:3000/users/
router.get('/', function(req, res, next) {
  //해당 텍스트를 웹브라우저에 서버 응답 결과물로 반환함.
  res.send('respond with a resource1');
});

//호출주소 : http://localhost:3000/users/testing
router.get('/testing', function(req, res, next) {
  res.send('respond with a resource2');
});

module.exports = router;
