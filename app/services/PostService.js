import * as PostRepository from "../repositories/PostRepository";
import _ from "lodash";

export async function createOrUpdatePost(data) {
    if (!_.isEmpty(data.id)) return await PostRepository.updatePost(data);
    return await PostRepository.createPost(data);
}

export async function getPosts(data) {
    const findData = !_.isEmpty(data.title) ? data : null;
    return await PostRepository.getPosts(findData);
}

export async function getPostById(postId) {
    return await PostRepository.getPostById(postId);
}

export async function deletePostById(postId) {
    const deleteData = await PostRepository.deletePostById(postId);
    console.log(deleteData);
    return deleteData;
}
