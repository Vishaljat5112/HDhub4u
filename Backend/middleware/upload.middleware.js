import multer from "multer";
import path from "path";

// file type check
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb(new Error("Only images allowed"));
};

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "poster") {
      cb(null, "uploads/posters");
    } else if (file.fieldname === "screenshots") {
      cb(null, "uploads/screenshots");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
