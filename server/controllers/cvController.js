const path = require('path');
const fs   = require('fs');

exports.downloadCV = (req, res) => {
  const { format } = req.params;

  if (!['pdf', 'docx'].includes(format)) {
    return res.status(400).json({ error: 'Invalid format. Use pdf or docx.' });
  }

  const filePath = path.join(__dirname, `../uploads/resume.${format}`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: `Resume ${format.toUpperCase()} not found. Upload it to /server/uploads/`
    });
  }

  const mimeTypes = {
    pdf:  'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };

  res.setHeader('Content-Type', mimeTypes[format]);
  res.setHeader('Content-Disposition', `attachment; filename="MananRathi_Resume.${format}"`);
  fs.createReadStream(filePath).pipe(res);
};