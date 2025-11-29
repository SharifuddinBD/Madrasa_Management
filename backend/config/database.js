const mongoose = require('mongoose');

// Debug: Log the environment variables
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI from env:', process.env.MONGODB_URI ? '***exists***' : 'MISSING!');

// Use a default connection string if MONGODB_URI is not set
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/madrasa_management';
console.log('Using MongoDB URI:', MONGODB_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('📴 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;