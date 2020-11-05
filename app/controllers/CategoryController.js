import * as CategoryService from "../services/CategoryService";
import _ from "lodash";

export default {
    createOrUpdateCategory: async (req, res, next) => {
        try {
            const data = {
                id: req.body.id,
                title: req.body.title,
            };
            const createOrUpdateCategory = await CategoryService.createOrUpdateCategory(data);
            const message = _.isEmpty(data.id) ? "Simpan" : "Perbaharui";
            if (!createOrUpdateCategory) {
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
    getAllCategories: async (req, res, next) => {
        try {
            const data = {
                title: { $regex: req.query.title || "", $options: "i" },
            };
            const getCategories = await CategoryService.getCategories(data);
            if (_.isEmpty(getCategories)) {
                return res.status(200).json({
                    success: true,
                    data: {},
                    message: "Data kosong",
                });
            }
            return res.status(200).json({
                success: true,
                data: {
                    getCategories,
                },
                message: "Data ditemukan",
            });
        } catch (err) {
            next(err);
        }
    },
};
