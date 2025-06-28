import multer from 'multer';
import path from 'path';

let allowedFileExtensions = ['.jpg', '.jpeg','.png','.pdf']
const fileFilter = (req, file, cb) => {
    
    if(allowedFileExtensions.includes(path.extname(file.originalname))){
        cb(null, true);
    } else {
        cb(new Error('Invalid file type! only jpg,jpeg and png are allowed'), false);
        //cb(new Error('Only images file are allowed'), false);
    }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, 'public/temp/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage, limits:{fieldSize: 5 * 1024 * 1024},fileFilter });

export default upload;
