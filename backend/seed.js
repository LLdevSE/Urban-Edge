const mongoose = require('mongoose');
const Property = require('./models/Property');
const Project = require('./models/Project');
const dotenv = require('dotenv');

dotenv.config();

const properties = [
  {
    title: 'Emerald Gardens - Gampaha',
    description: 'This prime land is ideally located with easy access to main roads, utilities, and essential services. Suitable for residential or investment purposes.',
    price: 4500000,
    location: 'Gampaha Town',
    size: 10,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
    status: 'Available'
  },
  {
    title: 'Silver Line Residency',
    description: 'Perfect for building your dream home in a quiet, residential neighborhood. Clear deeds and all approvals obtained.',
    price: 8200000,
    location: 'Kottawa',
    size: 6.5,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1449156003053-c3d8c0f11273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
    status: 'Available'
  },
  {
    title: 'Pine Hills Development',
    description: 'Breathtaking mountain views and fresh air. Ideal for a holiday home or eco-resort development.',
    price: 3500000,
    location: 'Kandy',
    size: 15,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
    status: 'Available'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urbanedge');
    console.log('Connected to MongoDB for seeding');
    
    await Property.deleteMany({});
    await Property.insertMany(properties);
    
    console.log('Database Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
