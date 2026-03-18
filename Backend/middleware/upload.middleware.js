import multer from "multer";
import path from "path";

// file type check
const fileFilter = (req, file, cb) => {

  // IMAGE TYPES
  const imageTypes = /jpeg|jpg|png|webp/;

  // VIDEO TYPES
  const videoTypes = /mp4|mkv|mov|avi/;

  const ext = path.extname(file.originalname).toLowerCase();

  // poster & screenshots → images
  if (file.fieldname === "poster" || file.fieldname === "screenshots") {

    const extCheck = imageTypes.test(ext);
    const mimeCheck = imageTypes.test(file.mimetype);

    if (extCheck && mimeCheck) {
      return cb(null, true);
    }

    return cb(new Error("Only image files allowed for poster/screenshots"));
  }

  // movie → video
  if (file.fieldname === "movie") {

    const extCheck = videoTypes.test(ext);
    const mimeCheck = videoTypes.test(file.mimetype);

    if (extCheck && mimeCheck) {
      return cb(null, true);
    }

    return cb(new Error("Only video files allowed for movie"));
  }

  cb(null, false);
};

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.fieldname === "poster") {
      cb(null, "uploads/posters");
    }

    else if (file.fieldname === "screenshots") {
      cb(null, "uploads/screenshots");
    }

    // movie temporary local storage
    else if (file.fieldname === "movie") {
      cb(null, "uploads");
    }

  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB movie upload
});

export default upload;
