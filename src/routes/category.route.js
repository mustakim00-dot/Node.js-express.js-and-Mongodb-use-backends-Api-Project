import e from "express";
import { createCategory, deleteCategory, getCategories, gotCategory, updateCategory } from "../controllers/category.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/fileUpload.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
import { createCategorySchema } from "../validators/category.validators.js";
const router = e.Router();
router.route("/categories").get(auth, getCategories).post(auth,upload.single('image'),validationMiddleware(createCategorySchema), createCategory);

router.route("/categories/:slugParam").get(auth, gotCategory).put(auth, upload.single('image'),validationMiddleware(createCategorySchema), updateCategory).delete( auth , deleteCategory );

export default router;