//2024.07.25
//미들웨어 함수 정의

//exports.함수명은 해당 모듈 파일에서 여러 개의 재사용 가능한 함수의 기능을
//외부에서 사용할 수 있도록 노출해줌.

/*
- 사용자 요청 URL을 분석해서 파라메터 방식으로 값이 전달된 경우,
 특정 파라메터 값을 추출해서 비지니스 로직을 처리
- http://localhost:3000/articles/1, http://localhost:3000/api/articles/1
*/
exports.checkParams = (req, res, next) => {

    if (req.params.id == undefined) {
        console.log("ID 파라메터가 존재하지 않습니다.");
        //res.redirect('/');
    }
    else {
        console.log("ID 파라메터 값 :", req.params.id);
    }
    next();
}

/*
- 사용자 요청 URL을 분석해서 쿼리스트링 방식으로 값이 전달된 경우,
  특정 키 값을 추출해서 비지니스 로직을 처리
- http://localhost:3000/articles?id=1
*/
exports.checkQuery = (req, res, next) => {

    if (req.query.category == undefined) {
        console.log("category 키가 존재하지 않습니다.");
        //res.redirect('/');
    }
    else {
        console.log("category 키 값 :", req.query.category);
    }
    next();
}
