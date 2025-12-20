const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, userController.getUsers);
router.delete('/:id', protect, userController.deleteUser);

module.exports = router;
