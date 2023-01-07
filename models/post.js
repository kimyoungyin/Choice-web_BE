import Sequelize from "sequelize";
import sequelize from "../src/database";

// sequelize model = musql table
export default sequelize.define("post", {
    // id는 sequelize에서 자동으로 생김
    title: {
        type: Sequelize.STRING(30), // 30자 제한 추가함
        allowNull: false,
    },
    category: {},
    choice1: {
        type: Sequelize.STRING(20), // 20자 제한 추가
        allowNull: false,
    },
    choice1Url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    choice2: {
        type: Sequelize.STRING(20), // 20자 제한 추가
        allowNull: false,
    },
    choice2Url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    // writer: {
    //     type: uid
    // }
});
