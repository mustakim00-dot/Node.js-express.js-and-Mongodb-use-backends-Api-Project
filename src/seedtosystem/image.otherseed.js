import { fileUpload } from '../utils/fileUpload.js';
import fs from 'fs';
import path from 'path';

const mainDirPath = path.resolve('./public/images');

const getImagePath = dir => {
  const files = fs.readdirSync(dir);
  return files.map(file => {
    const fullPath = path.join(dir, file);
    return fullPath;
  });
};
console.log(getImagePath(mainDirPath));

const resolve = async () => {
  const data = await Promise.all(
    getImagePath(mainDirPath).map(async path => {
      return await fileUpload(path, {
        folder: 'seedingFiles',
        use_filenames: true,
        overwrite: true,
        resource_type: 'image',
      });
    })
  );
  return data;
};

export default resolve;
