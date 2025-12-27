const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('/tmp/uploads'));

app.get('/api/health-check', (req, res) => {
  res.json({
    status: 'ok',
    environment: {
      MONGODB_URI: !!process.env.MONGODB_URI,
      JWT_SECRET: !!process.env.JWT_SECRET,
      GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID
    },
    timestamp: new Date().toISOString()
  });
});

// MongoDB Connection
const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    const msg = 'CRITICAL ERROR: MONGODB_URI is not defined in environment variables.';
    console.error(msg);
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  try {
    // Check if we have an active connection
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    // Do NOT exit process in serverless; just throw the error so the request fails gracefully-ish
    throw err;
  }
};

// Connect to DB for every request (Serverless optimization)
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database middleware connection failure:', error);
    res.status(500).json({ message: `Database connection failed: ${error.message}`, error: error.message });
  }
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

    let user = await User.findOne({ email: adminEmail });
    
    if (user) {
      console.log('Admin found, resetting password...');
      user.password = adminPassword;
      await user.save();
      console.log('Admin password reset complete.');
      return res.status(200).json({ message: 'Admin password reset successfully', user });
    }

    console.log('Creating new admin...');
    user = await User.create({
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    res.status(201).json({ message: 'Admin created successfully', user });
  } catch (error) {
    console.error('Error setting up admin:', error);
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
