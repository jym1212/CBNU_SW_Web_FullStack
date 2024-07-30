//2024.07.29
//member 모델 모듈 정의 
//sequelize ORM 문법으로 물리적 테이블과 맵핑되는 데이터 모델의 구조를 정의

/*
module.exports = function (sequelize, DataTypes) {
    //DB 서버와 연결 정보를 가진 sequelize 객체의 define() 메소드를 호출
    //1:1 맵핑되는 물리적 테이블과 맵핑되는 데이터 모델의 구조를 정의
    //define('물리적 테이블명 - 단수형', 관리 항목 정의(column), 추가 옵션);
    //단수형의 테이블명은 복수형의 물리적 테이블명이 생성 (members)
    return sequelize.define(
        //물리적 테이블명 정의
        'member',
        {
            //관련 컬럼 정의
            //회원 고유번호 (자동 채번)
            member_id: {
                type: DataTypes.INTEGER,   //ORM Framework에서 지원해주는 데이터 타입
                autoIncrement: true,        //자동 채번되는 컬럼(AI) 속성 추가
                primaryKey: true,           //현재 컬럼을 PK(기본 키)로 설정
                allowNull: false,           //NotNull (NN)으로 설정 (반드시 값 입력되어야 함.)
                comment: '회원 고유번호',    //해당 컬럼에 대한 설명
            },
            //회원 이메일
            email: {
                type: DataTypes.STRING(100), //varchar(100)으로 데이터 타입 생성
                allowNull: false,
                comment: '사용자 메일 주소',
            },
            //회원 이름
            name: {
                type: DataTypes.STRING(100), //varchar(100)으로 데이터 타입 생성
                allowNull: false,
                comment: '회원명',
            },
            //가입 일시
            entry_date: {
                type: DataTypes.DATE,        //DateTime형로 데이터 타입 생성   
                allowNull: false,
                comment: '가입 일시',
            }
        },
        {
            //추가 옵션 정의
            timestamps: true,   //등록 일시(createAt), 수정 일시(updateAt) 컬럼을 자동으로 생성
            paranoid: true      //해당 테이블의 데이터를 삭제하지 않고 deletedAt이라는 컬럼 생성
                                //삭제하면 삭제 일시 저장하고, 데이터 조회하면 조회되지 않음.
        }
    );
};
*/