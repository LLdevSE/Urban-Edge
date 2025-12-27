const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const multer = require('multer');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

const handleSingleUpload = (req, res, next) => {
  upload.single('mainImage')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post('/', protect, handleSingleUpload, projectController.createProject);
router.put('/:id', protect, handleSingleUpload, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;