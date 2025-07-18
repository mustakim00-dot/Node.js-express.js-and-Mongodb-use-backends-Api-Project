import e from "express";
//import { createCategory, deleteCategory, getCategories, gotCategory, updateCategory } from "../controllers/category.controller.js";
import { createSubCategory, deleteSubCategory, getSubCategories, gotSubCategory, updateSubCategory } from "../controllers/subcategory.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/fileUpload.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
import { createSubCategorySchema } from "../validators/subcategory.validators.js";
//import { createCategorySchema } from "../validators/category.validators.js";
const router = e.Router();
router.route("/subcategories").get(auth, getSubCategories).post(auth,upload.single('image'),validationMiddleware(createSubCategorySchema), createSubCategory);

router.route("/subcategories/:slugParam").get(auth, gotSubCategory).put(auth, upload.single('image'),validationMiddleware(createSubCategorySchema), updateSubCategory).delete( auth , deleteSubCategory );

export default router;