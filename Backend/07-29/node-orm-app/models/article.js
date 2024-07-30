//2024.07.29
//article 모델 모듈 정의
//sequelize ORM 문법으로 물리적 테이블과 맵핑되는 데이터 모델의 구조를 정의

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "article",
        {
            article_id: {
                type: DataTypes.INTEGER,    //ORM Framework에서 지원해주는 데이터 타입
                autoIncrement: true,        //자동 채번되는 컬럼(AI) 속성 추가
                primaryKey: true,           //현재 컬럼을 PK(기본 키)로 설정
                allowNull: false,           //NotNull (NN)으로 설정 (반드시 값 입력되어야 함.)
                comment: "게시글 고유번호",  //해당 컬럼에 대한 설명
            },
            board_type_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "게시판 고유번호  1: 공지사항 게시판, 2: 일반 사용자 게시판",
            },
            title: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: "게시글 제목",
            },
            article_type_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: "게시글 유형코드  0: 일반 게시글, 1: 상단 고정 게시글",
            },
            contents: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "게시글 내용",
            },
            view_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "조회수",
            },
            ip_address: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: "작성자 IP 주소",
            },
            is_display_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: "게시 여부  0: 게시 안 함, 1: 게시함",
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "등록 일시",
            },
            reg_member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "등록자 고유번호",
            },
            edit_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "수정 일시",
            },
            edit_member_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: "수정자 고유번호",
            },
        },
        {
            sequelize,
            tableName: "article", //기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨.
            timestamps: false,
            comment: "게시글 정보 테이블",
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "article_id" }], //여러 개의 컬럼이 PK인경우(복합키) {} 추가하여 설정 가능
                },
            ],
        }
    );
};