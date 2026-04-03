const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes only
app.use('/api/contact', require('./routes/contact'));
app.use('/api/cv',      require('./routes/cv'));
app.use('/api/stats',   require('./routes/stats'));

// Health check
app.get('/api/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const start = Date.now();
  try { await mongoose.connection.db.admin().ping(); } catch (e) {}
  res.json({
    status: 'online',
    uptime: Math.floor(process.uptime()),
    db: states[dbState],
    dbLatency: Date.now() - start,
    timestamp: new Date().toISOString()
  });
});

app.use(require('./middleware/errorHandler'));

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