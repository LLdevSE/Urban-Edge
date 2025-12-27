const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Determine upload directory (Vercel uses /tmp)
let uploadDir = (process.env.VERCEL || process.env.NODE_ENV === 'production') ? '/tmp/uploads/' : 'uploads/';

try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {
  console.warn(`Failed to create directory ${uploadDir}, falling back to /tmp/uploads/`);
  uploadDir = '/tmp/uploads/';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024 // 4MB limit per file (Vercel total limit is 4.5MB)
  }
});

module.exports = upload;
