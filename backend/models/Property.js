const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true }, // in perches
  type: { type: String, enum: ['Land', 'Residential', 'Commercial'], default: 'Land' },
  images: [{ type: String }],
  features: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['Available', 'Sold', 'Reserved'], default: 'Available' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
