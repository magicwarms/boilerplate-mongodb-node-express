import Categories from "../model/Categories";

export async function createCategory(data) {
    const category = new Categories({
        title: data.title,
    });
    return await category.save();
}

export async function updateCategory(data) {
    return await Categories.findByIdAndUpdate(
        {
            _id: data.id,
        },
        {
            $set: {
                title: data.title,
            },
        }
    );
}

export async function getCategories(findData) {
    return await Categories.find(findData).sort({ createdAt: -1 });
}
