const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@urbanedge.lk';
    const adminPassword = 'admin123';

    // Check if admin exists
    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Create Admin
    const user = await User.create({
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    console.log('Admin User Created Successfully!');
    console.log('--------------------------------');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('--------------------------------');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
