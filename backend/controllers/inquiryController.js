const Inquiry = require('../models/Inquiry');

exports.createInquiry = async (req, res) => {
  const inquiry = new Inquiry(req.body);
  try {
    const newInquiry = await inquiry.save();
    res.status(201).json({ message: 'Inquiry sent successfully', data: newInquiry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate('propertyId');
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
