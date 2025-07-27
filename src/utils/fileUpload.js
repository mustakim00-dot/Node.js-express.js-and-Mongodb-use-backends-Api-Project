/*
import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs';
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from '../constants.js';
import ApiError from './apiError.js';


  // Configuration
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
  });

  // Upload an image
  const fileUpload = async (file,options) =>{
    try {
      const data = await cloudinary.uploader.upload(file,{...options});
      console.log(file);
      
      unlinkSync(file);
      return data;
    } catch (error) {
      unlinkSync(file);
      throw ApiError.serverError(error.message);
    }
    
  }

  export { fileUpload };
  */
// path, {
//         public_id: 'shoes',
//       })
//       .catch(error => {
//         console.log(error);
//       });
  

  // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url('shoes', {
//     fetch_format: 'auto',
//     quality: 'auto',
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url('shoes', {
//     crop: 'auto',
//     gravity: 'auto',
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);

import { v2 as cloudinary } from 'cloudinary';
import { existsSync, unlinkSync } from 'fs';
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from '../constants.js';
import ApiError from './apiError.js';

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const fileUpload = async (file, options) => {
  try {
    const data = await cloudinary.uploader.upload(file, { ...options });

   if(existsSync(file)) unlinkSync(file);
    return data;
  } catch (error) {
   if (existsSync(file)) unlinkSync(file);
    throw ApiError.serverError(error.message);
  }
};

export { fileUpload };


