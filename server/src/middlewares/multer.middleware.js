import multer from "multer";
import { ApiError } from "../utils/ApiErrors.js";

const storage = multer.diskStorage({
  
  destination: function (req,file,cb){
    cb(null, './public/temp')

}, 

filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }

});

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

// File filter for validation
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only image files are allowed!"), false);
  }
};

export const upload = multer({ storage: storage, fileFilter })