const mongoose = require('mongoose');

const DownloadStatSchema = new mongoose.Schema({
  format: {
    type: String,
    enum: ['pdf', 'docx'],
    required: true
  },
  downloadedAt: {
    type: Date,
    default: Date.now
  },
  userAgent: String,
  ip: String
});

module.exports = mongoose.model('DownloadStat', DownloadStatSchema);
