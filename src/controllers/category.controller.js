//import Category from "../models/category.model.js";
import { Category } from "../models/category.model.js";
import ApiError from "../utils/apiError.js";
import ApiSuccess from "../utils/apiSuccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fileUpload } from "../utils/fileUpload.js";
import { categoryImageSchema } from "../validators/category.validators.js";


const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    if(categories.length === 0){
        return res.status(200).json(ApiSuccess.ok('no categories found', categories));
    }
    return res.status(200).json(ApiSuccess.ok('Categories fetched', categories));
});

const createCategory = asyncHandler(async(req,res) => {
    const image = req.file;
    //console.log(image);
    const validateImage = categoryImageSchema.safeParse(image);
    if(validateImage.error){
        throw ApiError.badRequest('image is required');
    }
    let { name,slug } = req.body;
    const isNameExists = await Category.findOne({ name });
    if(isNameExists){
        throw ApiError.badRequest('Category name already exists');
    }
    const isSlugExists = await Category.findOne({ slug });
    if(isSlugExists){
        throw ApiError.badRequest('Category slug already exists');
    }
    if(!slug){
        slug = name.toLowerCase().replaceAll(' ','-');
    }
    const result = await fileUpload(image.path, {
      folder: 'categories',
      user_filename: true,
      resource_type: 'image',
      overwrite: true,
       //unique_filename: true,
      public_id: name,
    });

    console.log(result);
    
    const category = await Category.create({
    name,
    slug,
    image: {
        url: result.secure_url,
        public_id: result.public_id,
    },
});
return res.status(201).json(ApiSuccess.ok('Category created', category));
});

const gotCategory = asyncHandler(async(req,res) => {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if(!category){
        throw ApiError.notFound('Category not found');
    }
    return res.status(200).json(ApiSuccess.ok('Category fetched', category));


})

const updateCategory = asyncHandler(async(req,res) => {

});


export { createCategory, getCategories, gotCategory, updateCategory };

