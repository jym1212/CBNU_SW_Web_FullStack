//2024.07.22 
//node, npm 사용법
//- moment, dotenv 패키지 사용

//index.js는 하나의 모듈 파일
//프로젝트에 설치된 노드 패키지 참조함.
//노드 패키지는 node_modules 폴더에 설치됨. (npm install 명령어로 설치)
//node.js backend에서는 require 예약어를 이용해 설치된 패키지 참조함.

//날짜 데이터 포맷을 변경하기 위해 moment 패키지 참조
const moment = require("moment");

//환경설정파일에서 환경변수 가져오기 위해 dotenv 패키지 참조
const env = require("dotenv");

//프로젝트 루트에 았는 .env 파일에 환경변수정보를 CPU 프로세스에서 접근 가능하게 구성해줌.
env.config();


//console 객체는 node framework 자체에서 제공하는 내장 객체
//주의 : console 객체는 웹브라우저 개발자도구 console의 로그와 다름.
console.log("index.js 모듈이 시작되었습니다.");

var toDate = Date();
var toDate2 = Date.now();

//순수 자바스크립트 날짜 데이터는 기본 숫자형으로 표시됨.
console.log("현재 일시를 출력합니다. (순수자바스크립트1) :", toDate);
console.log("현재 일시를 출력합니다. (순수자바스크립트2) :", toDate2);

//moment 패키지를 통해 숫자 타입 날짜 데이터 포맷을 변경함.
var formatedDate = moment(toDate2).format("YYYY-MM-DD HH:mm:ss");
console.log("formatedDate :", formatedDate);


//환경변수 중에 DB 주소와 사용자 정보를 조회함.
console.log("DB HOST IP :", process.env.DB_HOST_IP);
console.log("DB User ID :", process.env.DB_USER_ID);


//대부분의 자바스크립트 오류는 오탈자로 인한 오류
//초기 자바스크립트 언어 개발 시, 문제가 있다면 오탈자/대소문자 문제임.
//자바스크립트는 대소문자를 가리기 때문에 주의해야 함.

//package.json 파일은 패키지 정보를 담고 있는 파일
//dependencies 속성에는 프로젝트에 설치된 패키지 정보가 담겨 있음. (의존성 관리)

//JavaScript, ECMAScript는 동일한 의미를 가지며 자바스크립트 개발 언어의 버저닝 공식 명칭 

