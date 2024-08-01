//2024.08.01
//channel DB 테이블 정의

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "channel",
        {
            channel_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: "채널 고유번호",
            },
            community_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "소속 커뮤니티 고유번호",
            },
            category_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: "채널 분류 코드  -  1: 일대일 채팅채널, 2: 그룹 채팅채널",
            },
            channel_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "채널명",
            },
            channel_img_path: {
                type: DataTypes.STRING(300),
                allowNull: true,
                comment: "채널 대표 이미지 경로",
            },
            user_limit: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "최대 접속자 제한수",
            },

            channel_desc: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: "채널 설명",
            },
            channel_state_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: "채널 상태 코드  -  0: 사용 안 함, 1: 사용 중",
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
            tableName: "channel", //기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨.
            timestamps: false,
            comment: "채팅 채널 정보 테이블",
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "channel_id" }], //여러 개의 컬럼이 PK인 경우(복합키){ } 추가하여 설정 가능
                },
            ],
        }
    );
};
