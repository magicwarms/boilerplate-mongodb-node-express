import * as CategoryRepository from "../repositories/CategoryRepository";
import _ from "lodash";

export async function createOrUpdateCategory(data) {
    if (!_.isEmpty(data.id)) return await CategoryRepository.updateCategory(data);
    return await CategoryRepository.createCategory(data);
}

export async function getCategories(data) {
    const findData = !_.isEmpty(data.title) ? data : null;
    return await CategoryRepository.getCategories(findData);
}
