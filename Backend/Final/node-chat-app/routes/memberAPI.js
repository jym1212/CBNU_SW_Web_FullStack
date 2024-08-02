//2024.08.01
//일반회원 정보 처리를 위한 각종 요청과 응답 처리 라우터
//기본 호출 주소 : http://localhost:5000/api/member
//기본 호출 주소는 app.js에서 정의

var express = require('express');
var router = express.Router();


//단방향 암호화를 위한 bcryptjs 모듈 참조
var bcrypt = require('bcryptjs');

//JWT 토큰 생성 및 인증을 위한 jsonwebtoken 모듈 참조
const jwt = require('jsonwebtoken');

//ORM DB 객체 참조
var db = require('../models/index.js');


//2024.08.02
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

        //Step1 : 프론트엔드에서 전송해주는 회원정보 데이터(JSON) 추출
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        //사용자 암호를 단방향 암호화 문자열로 변환
        const encryptedPassword = await bcrypt.hash(password, 12);

        //Step2 : member 회원 테이블에서 데이터 등록
        //등록할 데이터 구조(속성명)는 member 모델의 속성명 기준 작성
        //DB member 테이블에 저장할 신규 JSON 데이터 생성 (NN 확인)
        const member = {
            email: email,
            member_password: encryptedPassword,
            name: name,
            profile_img_path: "/img/user.png",
            entry_type_code: 0,
            use_state_code: 1,
            entry_date: Date.now()
        };

        //DB member 테이블에 데이터 등록 처리 후, 실제 저장된 회원 정보 데이터 반환
        const registedMember = await db.Member.create(member);

        //암호화된 비밀번호 정보는 보안상 프론트엔드로 반환하지 않음
        registedMember.member_password = "";

        //Step3 : 등록 후, 반환된 회원 정보 데이터(실제 DB에 저장된 데이터)를 프론트엔드에 반환
        apiResult.code = 200;
        apiResult.data = { registedMember };
        apiResult.msg = "Succeed";

    } catch (error) {
        
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


/*
회원 로그인 데이터 처리 요청과 응답 라우팅 메소드
- 호출 주소: http://localhost:5000/api/member/login
- 호출 방식: Post 방식
- 응답 결과: 사용자 이메일/비밀번호를 체크하고, JWT 사용자 인증 토큰값 반환
*/
router.post('/login', async (req, res, next) => {
    
    let apiResult = {
        code: 400,
        data: null,
        msg: ""
    };

    try {

        //Step1 : 프론트엔드에서 전달해주는 로그인 사용자 이메일/비밀번호 추출
        const email = req.body.email;
        const password = req.body.password;

        //Step2 : 사용자 이메일 존재 여부 체크
        const member = await db.Member.findOne({ where: { email: email } });

        if (member) {

            //동일한 이메일을 가진 사용자가 존재하는 경우
            //Step3 : 사용자 암호값 일치 여부
            const compareResult = await bcrypt.compare(password, member.member_password);

            if (compareResult) {

                //비밀번호가 일치하는 경우
                //Step4 : 사용자 이메일/비밀번호가 일치하는 경우, 현재 로그인 사용자 주요정보 JSON 데이터로 생성
                const tokenJsonData = {
                    member_id: member.member_id,
                    email: member.email,
                    name: member.name,
                    profile_img_path: member.profile_img_path
                };

                //Step5 : 인증된 사용자 JSON 데이터를 JWT Token 내에 담아 JWT Token 문자열 생성
                //jwt.sign('토큰에 저장할 JSON 데이터', 토큰화 암호화 인증키 값, 옵션값(토큰 만료시간, 발급자));
                const token = await jwt.sign(tokenJsonData, process.env.JWT_AUTH_KEY, { expiresIn: '24h', issuer: "CBNU" });

                //Step6 : JWT Token 문자열을 프론트엔드에 반환
                apiResult.code = 200;
                apiResult.data = token;
                apiResult.msg = "Succeed";

            } else {
                
                //비밀번호가 틀린 경우, 프론트엔드로 결과값 바로 반환
                apiResult.code = 400;
                apiResult.data = null;
                apiResult.msg = "InCorrect Password";
            }
            
        } else {

            //이메일이 존재하지 않은 경우, 프론트엔드로 결과값 바로 반환
            apiResult.code = 400;
            apiResult.data = null;
            apiResult.msg = "Not Exist Email";
        }
        
    } catch (error) {
        
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "Server Error";
    }

    res.json(apiResult);
});


/*
현재 로그인한 사용자 상세 프로필 정보를 DB에서 조회하여 반환하는 라우팅 메소드
- 호출 주소: http://localhost:5000/api/member/profile
- 호출 방식: Get 방식
- 응답 결과 : 현재 로그인한 사용자의 상세 프로필 정보를 반환
- 프론트엔드에서 제공한 JWT 토큰값을 전달 받아 해당 사용자 이메일로 DB에서 조회한 결과값 반환
*/
router.get('/profile', async (req, res, next) => {
    
    let apiResult = {
        code: 400,
        data: null,
        msg: ""
    }

    try {

        //Step1 : 웹브라우저(헤더)에서 JWT 토큰값 추출
        //웹브라우저에서 전달되는 토큰값 예시 : "Bearer ....." (Bearer 뒤에 공백이 있어야 함)
        var token = req.headers.authorization.split('Bearer ')[1];

        //Step2 : JWT 토큰 문자열 내에서 인증 사용자 JSON 데이터 추출 (데이터 해독)
        //jwt.verify('토큰 문자열', 토큰 암호화 인증키 값);
        //verify() 메소드 실행 후, 토큰 내에 저장된 JSON 데이터 반환
        var loginMemberData = await jwt.verify(token, process.env.JWT_AUTH_KEY);

        //Step3 : 토큰 페이로드 영역에서 추출한 현재 로그인 사용자 고유번호를 기준으로 DB에서 단일 사용자 조회
        var dbMember = await db.Member.findOne({ where: { member_id: loginMemberData.member_id } });

        dbMember.member_password = ""; //보안상 비밀번호 정보는 프론트엔드로 반환하지 않음.

        //Step4 : 단일 사용자 정보를 프론트엔드로 전달
        apiResult.code = 200;
        apiResult.data = dbMember;
        apiResult.msg = "Succeed";
        
    } catch (error) {
        
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "Server Error";
    }

    res.json(apiResult);
});


/*
사용자 프로필 사진 업로드 및 정보 처리 라우팅 메소드
- 호출 주소: http://localhost:5000/api/member/profile/upload
- 호출 방식: Post 방식
- 응답 결과 : 프로필 사진 업로드 후, DB에 저장된 프로필 사진 경로 반환
- 프론트엔드에서 첨부한 이미지 파일 업로드 처리 후, 업로드된 정보 반환
*/
router.post('/profile/upload', upload.single('file'), async (req, res, next) => {

    let apiResult = {
        code: 400,
        data: null,
        msg: ""
    };

    try {

        //Step1: 업로드된 파일 정보 추출하기 
        const uploadFile = req.file;

        const filePath = `/upload/${uploadFile.filename}`;
        const fileName = uploadFile.originalname;
        const fileSize = uploadFile.size;
        const mimeType = uploadFile.mimetype;

        //파일정보를 DB에 저장하기
        const file = {
            filePath,
            fileName,
            fileSize,
            mimeType
        };

        //Step2: 업로드된 파일정보 반환하기 
        apiResult.code = 200;
        apiResult.data = file;
        apiResult.msg = "Ok";

    } catch (err) {
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "Failed";
    }

    res.json(apiResult);
})

module.exports = router;