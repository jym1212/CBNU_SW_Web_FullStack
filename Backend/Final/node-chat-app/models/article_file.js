//2024.08.01
//article_file DB 테이블 정의

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "article_file",
        {
            article_file_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: "게시글 첨부파일 고유번호",
            },
            article_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "참조하는 게시글 고유번호 (FK)",
            },
            file_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "파일명 - 확장자 포함",
            },
            file_size: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "파일 용량",
            },
            file_path: {
                type: DataTypes.STRING(200),
                allowNull: true,
                comment: "전체 파일 링크 정보 (도메인 포함 또는 미포함)",
            },
            file_type: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: "파일 mimetype",
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
        },
        {
            sequelize,
            tableName: "article_file", //기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨.
            timestamps: false,
            comment: "게시글 파일 정보 테이블",
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "article_file_id" }], //여러 개의 컬럼이 PK인 경우(복합키){ } 추가하여 설정 가능
                },
            ],
        }
    );
};
