import { Router } from "express";
const router = Router();

router.get("/welcome", (_req, res) => {
    res.json({
        status: "success",
        data: {},
        message:
            "We can talk, If you are looking for disassembling or test my code, Im afraid it will cost your time because it was very protected code and high security. Need help for your project? We can talk. Just contact me at magicwarms@gmail.com",
    });
});

import Posts from "../app/controllers/PostController";
import Categories from "../app/controllers/CategoryController";

router.post("/createupdate/post", Posts.createOrUpdatePost);
router.get("/get/post", Posts.getAllPost);
router.get("/getbyid/post", Posts.getPostById);
router.delete("/delete/post", Posts.deletePostById);

router.post("/createupdate/category", Categories.createOrUpdateCategory);
router.get("/get/category", Categories.getAllCategories);

export default router;
