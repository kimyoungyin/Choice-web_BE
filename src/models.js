import Sequelize from "sequelize";
import sequelize from "./database";

// sequelize model = musql table
export const Category = sequelize.define(
    "category",
    {
        // id는 sequelize에서 자동으로 생김
        name: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
    },
    { timestamps: false } // createdAt, updatedAT 필요 없음
);

export const Post = sequelize.define("post", {
    // id는 sequelize에서 자동으로 생김
    title: {
        type: Sequelize.STRING(20), // 20자 제한 추가함
        allowNull: false,
    },
    choice1: {
        type: Sequelize.STRING(20), // 20자 제한 추가
        allowNull: false,
    },
    choice1Url: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    choice2: {
        type: Sequelize.STRING(20), // 20자 제한 추가
        allowNull: false,
    },
    choice2Url: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    uploaderId: {
        type: Sequelize.STRING(28),
        allowNull: false,
    },
});

export const Choice = sequelize.define(
    "choice",
    {
        uid: {
            type: Sequelize.STRING(28), // uid 길이
            allowNull: false,
        },
        choiceType: {
            type: Sequelize.BOOLEAN, // 1 혹은 0
            allowNull: false,
        },
    },
    { timestamps: false } // createdAt, updatedAT 필요 없음
);
