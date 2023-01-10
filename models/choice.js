import Sequelize from "sequelize";
import sequelize from "../src/database";

// sequelize model = musql table
export default sequelize.define(
    "choice",
    {
        uid: {
            type: Sequelize.STRING(28), // uid 길이
            allowNull: false,
        },
        choiceType: {
            type: Sequelize.TINYINT(1), // 1 혹은 0
            allowNull: false,
        },
    },
    { timestamps: false } // createdAt, updatedAT 필요 없음
);
