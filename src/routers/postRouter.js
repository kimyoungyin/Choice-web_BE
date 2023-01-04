import express from "express";
import {
    cancelChoice,
    deletePost,
    getAllPosts,
    getPost,
    getPostsAboutCategory,
    postChoice,
    uploadPost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/").get(getAllPosts).post(uploadPost);
postRouter.get("/category/:categoryId", getPostsAboutCategory);
postRouter.route("/:id/choice").post(postChoice).delete(cancelChoice);
postRouter.route("/:id").get(getPost).delete(deletePost);

export default postRouter;
