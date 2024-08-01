//2024.08.01
//일반회원 정보 처리를 위한 각종 요청과 응답 처리 라우터
//기본 호출 주소 : http://localhost:5000/api/member
//기본 호출 주소는 app.js에서 정의

var express = requrie('express');
var router = express.Router();

/** 중요: 클라이언트에서 호출하는 주소와 호출 방식이 일치해야 해당 라우팅 메소드 실행 **/

/*
신규 회원 정보 등록 처리 요청과 응답 라우팅 메소드
- 호출 주소: http://localhost:5000/api/member/entry
- 호출 방식: Post 방식
- 응답 결과: 신규 회원 정보 등록 처리 후, DB에 저장된 회원 정보 반환
*/
router.post('/entry', async (req, res, next) => {

    //백엔드 API 호출하면 JSON 형식으로 데이터를 백엔드에서 반환 (API 처리 결과)
    let apiResult = {   
        code: 400,      //요청 상태 코드 (200 : 정상처리, 400 : 요청 리소스가 없음, 500 : 서버 개발자 에러)
        data: null,     //백엔드에서 프론트엔드로 전달할 데이터
        msg: ""         //처리 결과 코멘트 (백엔드에서 프론트엔드에게 알려주는 메세지)
    };

    //로직 에러가 발생하면 catch 블럭으로 에러 내용 전달
    try {

        //STEP1 : 프론트엔드에서 전송해주는 회원정보 데이터(JSON) 추출

        //STEP2 : member 회원 테이블에서 데이터 등록

        //STEP3 : 등록 후, 반환된 회원 정보 데이터(실제 DB에 저장된 데이터)를 프론트엔드에 반환

        apiResult.code = 200;
        apiResult.data = {};
        apiResult.msg = "Succeed";
    }
    catch (error) {
        
        console.log("/api/member/entry 호출 에러 발생: ", error.message);
        
        //백엔드의 구체적 에러 내용을 프론트엔드로 전송하는 것은 보안적 위험으로 인해 지양
        //DB 등록 처리 시, 먼저 DB 서버를 연결하는데 DB 연결 실패하면 연결 에러 메세지 제공
        //에러 메세지 정보는 보안적으로 공유하면 안 되는 정보 존재하여 제공하지 않음
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "Failed";
    }

    //프론트엔드에 최종 처리 결과 데이터 반환
    res.json(apiResult);
});

module.exports = router;