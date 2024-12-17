import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const parser = new DataParser();

// we wanna format the image to be able to send it to Cloudinary (because it's a buffer now)
export function formatImage(file) {
  /* console.log(file); */
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
}

export default upload;
