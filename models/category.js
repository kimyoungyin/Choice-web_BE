import Sequelize from "sequelize";
import sequelize from "../src/database";

// sequelize model = musql table
export default sequelize.define(
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
