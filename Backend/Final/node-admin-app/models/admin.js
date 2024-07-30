//2024.07.30
//admin DB 테이블 정의

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "admin",
        {
            admin_member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: "관리자 웹사이트 관리자 계정 고유번호",
            },
            company_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "소속 회사 코드  -  기준 정보 테이블 참조  0: 자회사, 1: 협력업체",
            },
            admin_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "관리자 계정 아이디",
            },
            admin_password: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: "관리자 계정 난독화된 단방향 암호화된 텍스트값",
            },
            admin_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: "관리자명",
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: "메일 주소",
            },
            telephone: {
                type: DataTypes.STRING(50),
                allowNull: true,
                comment: "전화번호",
            },
            dept_name: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: "부서명",
            },
            used_yn_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: "사용 여부 코드  -  0: 사용 불가, 1: 사용 중",
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
            tableName: "admin", //기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨.
            timestamps: false,
            comment: "관리자 계정 정보 테이블", 
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "admin_member_id" }], //여러 개의 컬럼이 PK인 경우(복합키){ } 추가하여 설정 가능
                },
            ],
        }
    );
};
