import fs from 'fs';
import path from 'path';
import { fileUpload } from '../utils/fileUpload.js';


const mainDirPath = path.resolve("public/images");

const getImagesPath = dir => fs.readdirSync(dir).map(file => path.join(dir, file));
const resolve = async () => {
   const data = await Promise.all(
       getImagesPath(mainDirPath).map(async filepath => {
        return await fileUpload(filepath, {
         folder: 'seedingFiles',
         user_filename: true,
         resource_type: 'image',
         overwrite: true,
   //unique_filename: true,
  // public_id: name,
    });
   })
 );
 //console.log(data);
 return data; 
};
//console.log(resolve());
resolve().then(data => console.log(data));


 //console.log(getImagesPath(mainDirPath));

 


// import fs from 'fs';
// import path from 'path';
// import { fileUpload } from '../utils/fileUpload.js';

// const mainDirPath = path.resolve('public/images');

// const getImagesPath = dir => {
//   return fs
//     .readdirSync(dir)
//     .map(file => path.join(dir, file))
//     .filter(filePath => fs.statSync(filePath).isFile());
// };

// const resolve = async () => {
//   try {
//     const data = await Promise.all(
//       getImagesPath(mainDirPath).map(async filepath => {
//         return await fileUpload(filepath, {
//           folder: 'seedingFiles',
//           user_filename: true,
//           resource_type: 'image',
//           overwrite: true,
//         });
//       })
//     );
//     console.log('Upload results:', data);
//     return data;
//   } catch (err) {
//     console.error('Upload error:', err);
//     return [];
//   }
// };

// // Run the function
// resolve();
