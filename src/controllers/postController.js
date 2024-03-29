import { Category, Choice, Post } from "../models";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                "categoryId",
                "choice1",
                "choice2",
                "id",
                "title",
                "createdAt",
            ],
            // 왜래키로 연결된 데이터 필드 가져오기
            include: [
                {
                    model: Category, // join할 모델
                    attributes: ["name"], // select해서 표시할 필드 지정
                },
            ],
            order: [["createdAt", "DESC"]], // 이차원 배열로 순서 구현(내림차순)
            limit: 10, // 개수 10개로 제한
        });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const getPostsAboutCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    if (!categoryId) return res.status(400).send("잘못된 형식의 요청입니다.");
    try {
        const posts = await Post.findAndCountAll({
            // 개수와 전체 개시글 목록까지 반환
            where: {
                categoryId,
            },
            order: [["createdAt", "DESC"]], // 이차원 배열로 순서 구현(내림차순)
            limit: 10, // 개수 10개로 제한
        });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const getPost = async (req, res) => {
    const postId = req.params.postId;
    if (!postId) return res.status(400).send("잘못된 형식의 요청입니다.");
    try {
        const post = await Post.findByPk(postId, {
            // 왜래키로 연결된 데이터 필드 가져오기
            include: [
                {
                    model: Choice, // join할 모델
                    attributes: ["choiceType"], // select해서 표시할 필드 지정
                },
            ],
        });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const uploadPost = async (req, res) => {
    const {
        body: { title, choice1, choice2, uploaderId, categoryName },
        files,
    } = req;
    try {
        if (!uploaderId) return res.status(401).send("Unauthorized");
        if (!categoryName || !title || !choice1 || !choice2)
            return res.status(400).send("잘못된 형식의 요청입니다."); // 다른 데이터들 있는지 체크해야
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
        const result = await Post.create({
            title,
            choice1,
            choice2,
            choice1Url: Array.isArray(files.choice1Image)
                ? files.choice1Image[0].location
                : null,
            choice2Url: Array.isArray(files.choice1Image)
                ? files.choice2Image[0].location
                : null,
            uploaderId,
            categoryId: finalCateogoryId,
        });
        return res.status(201).send("게시글 업로드 성공");
    } catch (error) {
        console.log(error);
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                uploaderId: req.uid,
            },
            order: [["createdAt", "DESC"]], // 이차원 배열로 순서 구현(내림차순)
            limit: 10, // 개수 10개로 제한
        });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const deletePost = async (req, res) => {
    const postId = req.params.postId;
    if (!postId) return res.status(400).send("잘못된 형식의 요청입니다.");

    try {
        // 내 글인지 확인 필요
        const result = await Post.destroy({
            where: {
                id: postId,
            },
        });
        return res
            .status(result ? 200 : 204) // 204: 요청은 유효하나 해당 자원을
            .send(
                result ? "게시글 삭제 성공" : "해당 게시글이 존재하지 않습니다."
            );
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const getChoice = async (req, res) => {
    const {
        params: { postId },
        uid,
    } = req;
    if (!postId)
        return res.status(400).send("해당 게시글이 존재하지 않습니다.");
    try {
        const choiceTypeObj = await Choice.findOne({
            attributes: ["choiceType"],
            where: {
                uid,
                postId,
            },
        });
        return res.status(200).json(choiceTypeObj);
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const postChoice = async (req, res) => {
    const {
        params: { postId },
        body: { choice },
        uid,
    } = req;
    if (choice === "")
        return res.status(400).send("아무것도 선택하지 않았습니다.");
    const choiceType = Number(choice); // 꼭 숫자로 바꿔주자
    if (!postId || (choiceType !== 0 && choiceType !== 1))
        return res.status(400).send("잘못된 형식의 요청입니다.");
    try {
        // 기존 좋아요 찾기
        const prevChoice = await Choice.findOne({
            where: { uid, postId },
        });
        const [, created] = await Choice.upsert({
            id: prevChoice ? prevChoice.id : undefined, // 이게 없으면 새로 만들고, 아니면 찾아서 업데이트
            uid,
            postId,
            choiceType,
        });
        return res.status(201).send(created ? `선택 완료` : "변경 완료");
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};

export const cancelChoice = async (req, res) => {
    const {
        params: { postId },
        uid,
    } = req;
    try {
        // 1이면 삭제함, 0이면 원래 없던 것
        const result = await Choice.destroy({
            where: {
                uid,
                postId,
            },
        });
        return res.status(200).send("취소 완료");
    } catch (error) {
        return res.status(500).send(`알 수 없는 에러가 발생했습니다.`);
    }
};
