
//import { Category, Subcategory } from "../models/index.model.js";

import { Category } from "../models/category.model.js";
import { Subcategory } from "../models/subcategory.model.js";
import ApiError from "../utils/apiError.js";
import ApiSuccess from "../utils/apiSuccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fileUpload } from "../utils/fileUpload.js";
import { categoryImageSchema } from "../validators/category.validators.js";

//void Subcategory;
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ $or: [{createdBy: req.user._id},{createdBy: null }]});
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
    //console.log(validateImage);
    
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
    createdBy: req.user._id,
});
return res.status(201).json(ApiSuccess.ok('Category created', category));
});

const gotCategory = asyncHandler(async(req,res) => {
    const { slugParam } = req.params;
    const category = await Category.find({ slug: slugParam });
    const subcategories = await Subcategory.find({category: category._id});
    //  .populate('subcategories');
    if(!category){
        throw ApiError.notFound('Category not found');
    }
    return res.status(200).json(ApiSuccess.ok('Category fetched', {category, subcategories}));


})

const updateCategory = asyncHandler(async(req,res) => {
    const { slugParam } = req.params;
    const { name,slug } = req.body;
    const category = await Category.findOne({ $and: [{ slug: slugParam },{ createdBy: req.user._id }] });
    if(!category){
        throw ApiError.notFound('Category not found');
    }
    const isNameExists = await Category.findOne({ _id: { $ne: category._id }, name });
    if (isNameExists) {
      throw ApiError.badRequest('Category name already exists');
    }
    const isSlugExists = await Category.findOne({ _id: { $ne: category._id },slug });
    if (isSlugExists) {
      throw ApiError.badRequest('Category slug already exists');
    }
    if (!slug) {
      slug = name.toLowerCase().replaceAll(' ', '-');
    }
    const image = req.file;
   if(image){
    const result = await fileUpload(image.path, {
      folder: 'categories',
      user_filename: true,
      resource_type: 'image',
      overwrite: true,
      //unique_filename: true,
      public_id: name,
    });
    category.image = {
        url: result.secure_url,
        public_id: result.public_id,
    }

   }
    
     category.name = name;
    category.slug = slug;
    await category.save();
    return res.status(200).json(ApiSuccess.ok('Category updated', category));
});

const deleteCategory = asyncHandler(async(req,res) => {
    const { slugParam } = req.params;
    const category = await Category.findOneAndDelete({ $and: [{ slug: slugParam }, { createdBy: req.user._id }] });
    if(!category){
        throw ApiError.notFound('Category not found');
    }
    await Subcategory.deleteMany({ category: category._id });
    //await category.remove();
    return res.status(201).json('Hello');
});


export { createCategory, deleteCategory, getCategories, gotCategory, updateCategory };

