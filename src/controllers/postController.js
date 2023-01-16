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
        body: { title, choice1, choice2, uploaderId, categoryName },
        files,
    } = req;
    try {
        if (!uploaderId) return res.status(401).send("Unauthorized");
        if (!categoryName || !title || !choice1 || !choice2)
            return res.status(400).send("잘못된 형식의 데이터입니다."); // 다른 데이터들 있는지 체크해야
        let finalCateogoryId;
        // 검색 후 하나 발견한 순간 정지
        const searchedCategory = await Category.findOne({
            where: { name: categoryName },
        });
        // 카테고리 있으면 기존 id 가져오기
        if (searchedCategory) {
            finalCateogoryId = searchedCategory.id;
        } else {
            const newCategory = await Category.create({ name: categoryName }); // 없으면 새로 생성 후 id 할당
            finalCateogoryId = newCategory.id;
        }
        await Post.create({
            title,
            choice1,
            choice2,
            choice1Url: files.choice1Image[0].location || null,
            choice2Url: files.choice2Image[0].location || null,
            uploaderId,
            categoryId: finalCateogoryId,
        });
        return res.status(201).send("게시글 업로드 성공");
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const getUserPosts = (req, res) => {
    const uid = req.params.uid;
    if (!uid) return res.status(400).send("잘못된 형식의 데이터입니다.");
    const posts = Post.findAll({
        where: {
            uploaderId: uid,
        },
        order: [["createdAt", "DESC"]], // 이차원 배열로 순서 구현(내림차순)
        limit: 10, // 개수 10개로 제한
    });
    console.log(posts);
    return res.json(posts);
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
