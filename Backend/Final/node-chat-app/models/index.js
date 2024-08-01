//2024.08.01
//Sequelize를 이용한 ORM 모델 정의 파일

//서버 상의 경로를 조회하는 패키지 참조
const path = require('path');

//시퀄라이즈 ORM 프레임워크 객체 참조
//대문자 Sequelize : 각종 sequelize ORM 프레임워크 내에서 제공하는 객체, 데이터 타입 제공
const Sequelize = require('sequelize');

//개발모드 환경 설정
const env = process.env.NODE_ENV || 'development';

//DB 연결 환경설정 정보 변경 처리, 관련 정보 수정
//__dirname : 현재 모듈(index.js)의 물리적 경로 조회
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

//데이터 베이스 객체
const db = {};

//DB 연결 정보로 시퀄라이즈 ORM 객체 생성
//소문자 sequelize : 실제 DB 서버에 연결하고, DB 서버에 SQL 구문을 전달해서 데이터를 처리하는 기능 제공
const sequelize = new Sequelize(config.database, config.username, config.password, config);

//DB 처리 객체에 시퀄라이즈 정보 맵핑 처리
//이후, DB 객체를 통해 데이터 관리 가능함.
db.sequelize = sequelize; //DB 연결 정보를 포함한 DB 제어 객체 속성(CRUD) - 소문자 sequelize
db.Sequelize = Sequelize; //Sequelize 패키지에서 제공하는 각종 데이터 타입 및 관련 객체정보를 제공 - 대문자 Sequelize


//전체 모델 모듈 파일 참조하고, DB 속성 정의
db.Article = require("./article.js")(sequelize, Sequelize);
db.ArticleFile = require("./article_file.js")(sequelize, Sequelize);
db.Channel = require("./channel.js")(sequelize, Sequelize);
db.ChannelMember = require("./channel_member.js")(sequelize, Sequelize);
db.ChannelMsg = require("./channel_msg.js")(sequelize, Sequelize);
db.Member = require("./member.js")(sequelize, Sequelize);


//DB 객체 외부로 노출
module.exports = db;