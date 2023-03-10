import express from "express";
import cors from "cors";
import morgan from "morgan";
import postRouter from "./routers/postRouter";
import categoryRouter from "./routers/categoryRouter";
import sequelize from "./database";
import { Category, Choice, Post } from "./models";
// 꼭 가져와야 sync가 정상 작동한다.

const PORT = 4000;

const logger = morgan("dev");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // body 접근 가능

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(logger);
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);

// association
Post.belongsTo(Category, { constraints: true, onDelete: "CASCADE" }); // 삭제될 경우 연결된 테이블 내용도 삭제
Category.hasMany(Post);
Choice.belongsTo(Post, { constraints: true, onDelete: "CASCADE" });
Post.hasMany(Choice);

const handleListening = () =>
    console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

sequelize
    .sync()
    //{ force: true }는 기존 테이블 제거 후 덮어쓰기 => 이후 다시 지워야 함
    // sequelize에 정의된 모든 모델을 가져오고 해당 테이블이 없으면 생성함(테이블명은 복수형으로 자동 생성), id, createdAt, updatedAt
    .then(() => {
        app.listen(PORT, handleListening);
    })
    .catch((error) => console.log(error));
