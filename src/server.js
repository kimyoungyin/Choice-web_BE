import express from "express";
import cors from "cors";
import morgan from "morgan";
import postRouter from "./routers/postRouter";
import categoryRouter from "./routers/categoryRouter";

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

app.listen(PORT, handleListening);
