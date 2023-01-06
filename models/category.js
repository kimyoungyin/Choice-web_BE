import Sequelize from "sequelize";
import sequelize from "../src/database";

// sequelize model = musql table
export default Category = sequelize.define("category", {
    // id는 sequelize에서 자동으로 생김
    // id: {
    //     type: Sequelize.INTEGER,
    //     autoincrement: true,
    //     allowNull: false,
    //     primaryKey: true,
    // },
    name: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
});
