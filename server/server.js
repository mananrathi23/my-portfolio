const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/cv', require('./routes/cv'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/stats', require('./routes/stats'));

// Health check route
app.get('/api/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const start = Date.now();
  // Ping DB
  try {
    await mongoose.connection.db.admin().ping();
  } catch (e) {}
  const latency = Date.now() - start;
  res.json({
    status: 'online',
    uptime: Math.floor(process.uptime()),
    db: states[dbState],
    dbLatency: latency,
    timestamp: new Date().toISOString()
  });
});

// Error handler middleware
app.use(require('./middleware/errorHandler'));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
