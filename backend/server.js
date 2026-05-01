require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./src/routes/healthRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Request logging

const authRoutes = require('./src/routes/authRoutes');
const professorRoutes = require('./src/routes/professorRoutes');
const subjectRoutes = require('./src/routes/subjectRoutes');
const timetableRoutes = require('./src/routes/timetableRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');

// Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/professors', professorRoutes);
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/timetables', timetableRoutes);
app.use('/api/v1/attendance', attendanceRoutes);

// Unhandled Route Fallback
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server`
  });
});

// Centralized Error Handler
app.use(errorHandler);

const { initializeDatabase } = require('./src/config/initDb');

const PORT = process.env.PORT || 5000;

// Initialize Database then start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database on startup:', err);
});
