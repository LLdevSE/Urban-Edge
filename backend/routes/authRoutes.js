const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authController.loginUser);
router.post('/google', authController.googleLogin);
router.post('/register-user', authController.registerUser);
router.post('/register', authController.registerAdmin); // Admin only

module.exports = router;
