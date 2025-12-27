const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', protect, upload.array('images', 10), propertyController.createProperty);
router.put('/:id', protect, upload.array('images', 10), propertyController.updateProperty);
router.delete('/:id', protect, propertyController.deleteProperty);

module.exports = router;
