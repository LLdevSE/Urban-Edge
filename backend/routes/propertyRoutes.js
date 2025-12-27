const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', protect, propertyController.createProperty);
router.put('/:id', protect, propertyController.updateProperty);
router.delete('/:id', protect, propertyController.deleteProperty);

module.exports = router;
