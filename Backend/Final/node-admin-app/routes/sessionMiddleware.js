//2024.08.02
//session의 middleware를 이용하여 로그인 여부 체크

//관리자 로그인 상태 체크 미들웨어 함수
exports.inLoggined = (req, res, next) => {

    if (req.session.isLogined != undefined) {
        
        //세션에 isLogined 속성이 존재하는 경우
        //현재 사용자가 로그인 상태이면 요청했던 프로세스로 이동
        next();
    }
    else {

        //세션에 isLogined 속성이 존재하는 경우
        //현재 사용자가 로그인 상태가 아닌 경우 로그인 페이지로 이동
        res.redirect('/login');
    }
};