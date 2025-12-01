require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const noticeRoutes = require('./routes/notices');
// const classRoutes = require('./routes/classRoutes');
// const examRoutes = require('./routes/examRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/notices', noticeRoutes);
// app.use('/api/classes', classRoutes);
// app.use('/api/exams', examRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`📚 Darul Hikmah Institute API ready at http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});