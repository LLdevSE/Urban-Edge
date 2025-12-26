const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for Vercel deployment
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process with failure
  }
};

// Connect to DB for every request (Serverless optimization)
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Routes
const propertyRoutes = require('./routes/propertyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/properties', propertyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Temporary Route to Seed Admin
const User = require('./models/User');
const Property = require('./models/Property');
const Project = require('./models/Project');
const { properties, projects } = require('./seedData');

app.get('/api/setup-admin', async (req, res) => {
  try {
    const adminEmail = 'admin@urbanedge.lk';
    const adminPassword = 'admin123';

    const userExists = await User.findOne({ email: adminEmail });
    if (userExists) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    const user = await User.create({
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    res.status(201).json({ message: 'Admin created successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/seed-db', async (req, res) => {
  try {
    await Property.deleteMany({});
    await Property.insertMany(properties);

    await Project.deleteMany({});
    await Project.insertMany(projects);

    res.status(201).json({ message: 'Database Seeded Successfully with Properties and Projects' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Urban Edge API is running...');
});

// Start Server
const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = app;
