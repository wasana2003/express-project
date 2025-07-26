const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, getImage } = require('../controller/image_controller');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // You can change this logic to ensure uniqueness if needed
  }
});

const upload = multer({ storage: storage });

// Upload route
router.post('/upload', upload.single('image'), uploadImage);

// Retrieve route
router.get('/:filename', getImage);

module.exports = router;
