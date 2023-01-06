import express from "express";
import cors from "cors";
import morgan from "morgan";
import postRouter from "./routers/postRouter";
import categoryRouter from "./routers/categoryRouter";
import sequelize from "./database";
import Category from "../models/category"; // 꼭 가져와야 sync가 정상 작동한다.

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

const handleListening = () =>
    console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

sequelize
    .sync() // sequelize에 정의된 모든 모델을 가져오고 해당 테이블이 없으면 생성함(테이블명은 복수형으로 자동 생성), id, createdAt, updatedAt
    .then((result) => {
        app.listen(PORT, handleListening);
    })
    .catch((error) => console.log(error));
