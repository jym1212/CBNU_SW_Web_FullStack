//2024.07.30
//channel_msg DB 테이블 정의

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "channel_msg",
        {
            channel_msg_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: "채널 메시지 고유번호",
            },
            channel_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "채널 고유번호",
            },
            member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "메시지 발생 회원 고유번호",
            },
            nick_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "대화명 - 닉네임",
            },
            msg_type_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment:
                    "메시지 유형 코드  -  0: 퇴장 메시지, 1: 입장 메시지, 2: 일반 사용자 메시지, 3: 파일 공유 메시지, 4: 시스템 공지 메시지",
            },
            connection_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "웹소켓 고유연결 아이디",
            },
            message: {
                type: DataTypes.STRING(4000),
                allowNull: false,
                comment: "메시지 내용",
            },
            ip_address: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: "사용자 IP",
            },
            msg_state_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: "메시지 상태 코드  -  0: 삭제, 1:사용 중",
            },
            msg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "메시지 작성 일시",
            },
            edit_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "메시지 수정 일시",
            },
            del_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "메시지 삭제 일시",
            },
        },
        {
            sequelize,
            tableName: "channel_msg", //기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨.
            timestamps: false,
            comment: "채널 메시지 정보 테이블",
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "channel_msg_id" }], //여러 개의 컬럼이 PK인 경우(복합키){ } 추가하여 설정 가능
                },
            ],
        }
    );
};
