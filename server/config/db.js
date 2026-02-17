const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Server will continue with fallback data on frontend.');
  }
}

module.exports = connectDB;
