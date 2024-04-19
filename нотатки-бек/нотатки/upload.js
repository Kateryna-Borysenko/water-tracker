// import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import dotenv from "dotenv";
import usersServices from "../services/usersServices.js";
dotenv.config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//req, file) ???????

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     const { _id } = req.user;
//     let folder = "water-tracker-avatars";
//     //let folder;
//     // if (file.fieldname === "avatar") {
//     //   folder = "avatars";
//     // } else if (file.fieldname === "documents") {
//     //   folder = "documents";
//     // } else {
//     //   folder = "misc";
//     // }
//     return {
//       folder: folder,
//       allowed_formats: ["jpg", "png", "webp"],
//       // public_id: _id,
//       public_id: file.originalname,
//       transformation: [
//         { width: 350, height: 350 },
//         { width: 700, height: 700 },
//       ],
//     };
//   },
// });

const upload = async (req, res, next) => {
  const { _id: id } = req.user;

  // console.log();
  // const { image } = req.file;

  const { imageURL } = req.body; //BODY not FILE?
  try {
    // if (!req.file) {
    //   throw HttpError(400, "No file");
    // }

    const result = await cloudinary.uploader.upload(imageURL, {
      folder: "water-tracker-avatars",
    }); //

    const user = await usersServices.updateUser(
      { _id: id },
      { avatarURL: result.secure_url },
      { new: true }
    );
    res.status(201).json({ avatarURL: result.secure_url });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// const upload = multer({ storage });

export default upload;

// const destination = path.resolve("temp");

// const storage = multer.diskStorage({
//   destination,
//   filename: (req, file, cb) => {
//     const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const filename = `${uniquePrefix}_${file.originalname}`;
//     cb(null, filename);
//   },
// });

// const limits = {
//   fileSize: 1024 * 1024 * 5, // message
// };

// const fileFilter = (req, file, cb) => {
//   const extension = file.originalname.split(".").pop();
//   if (extension === "exe") {
//     return cb(HttpError(400, ".exe not valid extension format"));
//   }

//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/; //svg?

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = mimetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only!"), false); //HttpError
//   }
// };

// const upload = multer({
//   storage,
//   limits,
//   fileFilter,
// });

// export default upload;
