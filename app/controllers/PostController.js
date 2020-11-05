import * as PostService from "../services/PostService";
import _ from "lodash";

export default {
    createOrUpdatePost: async (req, res, next) => {
        try {
            const data = {
                id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                categories: JSON.parse(req.body.categories),
            };
            const createOrUpdatePost = await PostService.createOrUpdatePost(data);
            const message = _.isEmpty(data.id) ? "Simpan" : "Perbaharui";
            if (!createOrUpdatePost) {
                return res.status(200).json({
                    success: false,
                    data: {},
                    message: `${message} data tidak berhasil`,
                });
            }
            return res.status(200).json({
                success: true,
                data: {},
                message: `${message} data berhasil`,
            });
        } catch (err) {
            next(err);
        }
    },
    getAllPost: async (req, res, next) => {
        try {
            const data = {
                title: { $regex: req.query.title || "", $options: "i" },
            };
            const getPosts = await PostService.getPosts(data);
            if (_.isEmpty(getPosts)) {
                return res.status(200).json({
                    success: true,
                    data: {},
                    message: "Data kosong",
                });
            }
            return res.status(200).json({
                success: true,
                data: {
                    getPosts,
                },
                message: "Data ditemukan",
            });
        } catch (err) {
            next(err);
        }
    },
    getPostById: async (req, res, next) => {
        try {
            const id = req.query.id;
            if (_.isEmpty(id)) {
                return res.status(422).json({
                    success: false,
                    data: {},
                    message: "Data ID diperlukan",
                });
            }
            const getPost = await PostService.getPostById(id);
            if (_.isEmpty(getPost)) {
                return res.status(200).json({
                    success: true,
                    data: {},
                    message: "Data kosong",
                });
            }
            return res.status(200).json({
                success: true,
                data: {
                    getPost,
                },
                message: "Data ditemukan",
            });
        } catch (err) {
            next(err);
        }
    },
    deletePostById: async (req, res, next) => {
        try {
            const id = req.body.id;
            if (_.isEmpty(id)) {
                return res.status(422).json({
                    success: false,
                    data: {},
                    message: "Data ID diperlukan",
                });
            }
            const deletePostById = await PostService.deletePostById(id);
            if (!deletePostById) {
                return res.status(200).json({
                    success: false,
                    data: {},
                    message: "Data tidak berhasil dihapus",
                });
            }
            return res.status(200).json({
                success: true,
                data: {},
                message: "Data berhasil dihapus",
            });
        } catch (err) {
            next(err);
        }
    },
};
