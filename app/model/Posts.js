import { model, Schema } from "mongoose";

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [4, "title is too short!"],
            maxlength: [25, "title is too long!"],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: [4, "description is too short!"],
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Categories",
                required: true,
            },
        ],
    },
    {
        timestamps: true,
        collection: "posts",
    }
);

const Posts = model("Posts", PostSchema);

export default Posts;
