const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

// Configure Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createInquiry = async (req, res) => {
  const inquiry = new Inquiry(req.body);
  try {
    const newInquiry = await inquiry.save();

    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'lahirufirst1@gmail.com', // Recipient email
      subject: `New Inquiry: ${newInquiry.type} - ${newInquiry.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #1E4C7A;">New Website Inquiry Received</h2>
          <p><strong>Name:</strong> ${newInquiry.name}</p>
          <p><strong>Email:</strong> ${newInquiry.email}</p>
          <p><strong>Phone:</strong> ${newInquiry.phone}</p>
          <p><strong>Type:</strong> <span style="background-color: #e3f2fd; padding: 5px 10px; border-radius: 5px; color: #1565c0;">${newInquiry.type}</span></p>
          <hr style="border-top: 1px solid #eee;">
          <h3>Message:</h3>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${newInquiry.message}</p>
          <br>
          <small style="color: #888;">This email was sent automatically from the Urban Edge website.</small>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // We don't block the response if email fails, just log it
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Inquiry sent successfully', data: newInquiry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate('propertyId').sort({ createdAt: -1 }); // Sort by newest first
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
