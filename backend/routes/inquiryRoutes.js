const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', inquiryController.createInquiry);
router.get('/', protect, inquiryController.getInquiries);

module.exports = router;
