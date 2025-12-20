const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  mainImage: { type: String },
  blocks: [{
    blockNumber: String,
    size: Number,
    price: Number,
    status: { type: String, enum: ['Available', 'Sold', 'Reserved'], default: 'Available' }
  }],
  status: { type: String, enum: ['Ongoing', 'Completed', 'Upcoming'], default: 'Upcoming' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
