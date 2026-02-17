import multer from 'multer';
import path from 'path';

// Configure where and how to store uploaded files on disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Make sure 'uploads' folder exists
    },
    filename: (req, file, cb) => {
        // Use timestamp + original name for uniqueness
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Limit file size (optional)
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    fileFilter: (req, file, cb) => {
        // Accept only images
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    },
});

export default upload;
