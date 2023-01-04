export const getAllPosts = (req, res) => {
    return res.send("It is about all posts!");
};

export const getPostsAboutCategory = (req, res) => {
    return res.send(`It is posts with categoryId: ${req.params.categoryId}`);
};

export const getPost = (req, res) => {
    return res.send(`I show post with id: ${req.params.id}`);
};

export const uploadPost = (req, res) => {
    return res.send("upload");
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
