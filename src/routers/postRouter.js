import express from "express";
import {
    cancelChoice,
    deletePost,
    getAllPosts,
    getPost,
    getPostsAboutCategory,
    getUserPosts,
    postChoice,
    uploadPost,
} from "../controllers/postController";
import { uploadFiles } from "../middlewares";

const postRouter = express.Router();

postRouter
    .route("/")
    .get(getAllPosts)
    .post(
        uploadFiles.fields([
            { name: "choice1Image", maxCount: 1 },
            { name: "choice2Image", maxCount: 1 },
        ]),
        uploadPost
    );
postRouter.get("/profile/:uid", getUserPosts);
postRouter.get("/category/:categoryId", getPostsAboutCategory);
postRouter.route("/:id/choice").post(postChoice).delete(cancelChoice);
postRouter.route("/:id").get(getPost).delete(deletePost);

export default postRouter;
