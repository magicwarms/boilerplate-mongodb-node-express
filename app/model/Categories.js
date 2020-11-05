import { model, Schema } from "mongoose";

const CategoriesSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [4, "title is too short!"],
            maxlength: [25, "title is too long!"],
        },
    },
    {
        timestamps: true,
        collection: "categories",
    }
);

const Categories = model("Categories", CategoriesSchema);

export default Categories;
