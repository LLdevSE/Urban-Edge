const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', protect, upload.single('mainImage'), projectController.createProject);
router.put('/:id', protect, upload.single('mainImage'), projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;
