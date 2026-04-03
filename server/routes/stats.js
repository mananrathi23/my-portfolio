const router = require('express').Router();
const mongoose = require('mongoose');
const Contact  = require('../models/Contact');

router.get('/', async (req, res) => {
  try {
    const start = Date.now();
    await mongoose.connection.db.admin().ping();
    const dbLatency = Date.now() - start;

    const totalMessages = await Contact.countDocuments();

    res.json({
      status:        'online',
      uptime:        Math.floor(process.uptime()),
      db:            'connected',
      dbLatency,
      totalMessages,
      timestamp:     new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

module.exports = router;