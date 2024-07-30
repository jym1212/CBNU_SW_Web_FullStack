//2024.07.29
//member 모델 모듈 정의
//sequelize ORM 문법으로 물리적 테이블과 맵핑되는 데이터 모델의 구조를 정의

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "member",
        {
            member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: "회원 고유번호",
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "사용자 메일 주소",
            },
            member_password: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: "사용자 난독화된 해시암호 문자열",
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "회원명",
            },
            profile_img_path: {
                type: DataTypes.STRING(300),
                allowNull: true,
                comment: "회원 프로필 이미지 경로",
            },
            telephone: {
                type: DataTypes.STRING(200),
                allowNull: true,
                comment: "전화번호 - AES 양방향 암호화 적용",
            },
            entry_type_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: "가입 유형코드  0: 직접 가입, 1: 페이스북 SNS",
            },
            use_state_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: "이용 상태  0:허용 대기, 1: 사용 중, 2:탈퇴 처리",
            },
            birth_date: {
                type: DataTypes.STRING(200),
                allowNull: true,
                comment: "생년월일 - AES 양방향 암호화 적용",
            },
            entry_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "등록 일시",
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
            tableName: "member",
            timestamps: false,
            comment: "회원 정보",
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "member_id" }],
                },
            ],
        }
    );
};