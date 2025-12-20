const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authController.loginUser);
router.post('/register', authController.registerAdmin); // NOTE: Ideally protect this or disable in production

module.exports = router;
