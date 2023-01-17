import { Category } from "../models";

const getAllCategories = async (req, res) => {
    try {
        const posts = await Category.findAll();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export default getAllCategories;
