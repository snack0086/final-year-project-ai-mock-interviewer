const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage so we can stream the buffer to Cloudinary
const storage = multer.memoryStorage();

// Configure multer with file filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, PDF, DOC, and DOCX files are allowed"));
    }
  },
});

// Upload a buffer to Cloudinary and return the result (with secure_url)
const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ai-interviewer-resumes",
        resource_type: "auto",
        public_id: `resume-${Date.now()}-${path.parse(filename).name}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

module.exports = { upload, cloudinary, uploadToCloudinary };