import Posts from "../model/Posts";

export async function createPost(data) {
    const post = new Posts({
        title: data.title,
        description: data.description,
    });
    return await post.save();
}

export async function getPosts(findData) {
    return await Posts.find(findData).sort({ createdAt: -1 });
}

export async function updatePost(data) {
    return await Posts.findByIdAndUpdate(
        {
            _id: data.id,
        },
        {
            $set: {
                title: data.title,
                description: data.description,
            },
        }
    );
}

export async function getPostById(postId) {
    return await Posts.findById(postId);
}

export async function deletePostById(postId) {
    return await Posts.remove({ _id: postId });
}
