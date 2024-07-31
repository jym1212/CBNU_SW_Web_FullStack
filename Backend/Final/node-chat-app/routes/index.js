var express = require('express');
var router = express.Router();

/* 메인 페이지 요청과 응답 처리 라우팅 메소드 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Chat-app' });
});

module.exports = router;
