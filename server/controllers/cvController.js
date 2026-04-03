const path = require('path');
const fs = require('fs');
const DownloadStat = require('../models/DownloadStat');

exports.downloadCV = async (req, res) => {
  const { format } = req.params;

  if (!['pdf', 'docx'].includes(format)) {
    return res.status(400).json({ error: 'Invalid format. Use pdf or docx.' });
  }

  const filePath = path.join(__dirname, `../uploads/resume.${format}`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Resume ${format.toUpperCase()} not found. Please upload it to /server/uploads/` });
  }

  // Track the download
  try {
    await DownloadStat.create({
      format,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
  } catch (e) {
    console.error('Stat tracking failed:', e.message);
  }

  const mimeTypes = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };

  res.setHeader('Content-Type', mimeTypes[format]);
  res.setHeader('Content-Disposition', `attachment; filename="YourName_Resume.${format}"`);
  fs.createReadStream(filePath).pipe(res);
};

exports.getDownloadStats = async (req, res) => {
  try {
    const total = await DownloadStat.countDocuments();
    const pdf = await DownloadStat.countDocuments({ format: 'pdf' });
    const docx = await DownloadStat.countDocuments({ format: 'docx' });
    res.json({ total, pdf, docx });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
