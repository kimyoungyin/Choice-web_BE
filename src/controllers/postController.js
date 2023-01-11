import { Category, Post } from "../models";

export const getAllPosts = (req, res) => {
    return res.send("It is about all posts!");
};

export const getPostsAboutCategory = (req, res) => {
    return res.send(`It is posts with categoryId: ${req.params.categoryId}`);
};

export const getPost = (req, res) => {
    return res.send(`I show post with id: ${req.params.id}`);
};

export const uploadPost = async (req, res) => {
    const {
        title,
        choice1,
        choice1Url,
        choice2,
        choice2Url,
        uploaderId,
        categoryName,
    } = req.body;
    // url에 대해서는 storage 연결 후
    if (!uploaderId) return res.status(401).send("Unauthorized");
    if (!categoryName || !title || !choice1 || !choice2)
        return res.status(400).send("잘못된 형식의 데이터입니다."); // 다른 데이터들 있는지 체크해야
    let finalCateogoryId;
    const searchedCategory = await Category.findOne({
        // 검색 후 하나 발견한 순간 정지
        where: { name: categoryName },
    });
    if (searchedCategory) {
        // 카테고리 있으면 기존 id 가져오기
        finalCateogoryId = searchedCategory.id;
    } else {
        const newCategory = await Category.create({ name: categoryName }); // 없으면 새로 생성 후 id 할당
        finalCateogoryId = newCategory.id;
    }
    await Post.create({
        title,
        choice1,
        choice2,
        choice1Url,
        choice2Url,
        uploaderId,
        categoryId: finalCateogoryId,
    });
    return res.status(201).send("게시글 업로드 성공");
};

export const deletePost = (req, res) => {
    return res.send("delete");
};

export const postChoice = (req, res) => {
    console.log(req.body);
    return res.send(`choice complete`);
};

export const cancelChoice = (req, res) => {
    return res.send(`Choice is canceled`);
};
