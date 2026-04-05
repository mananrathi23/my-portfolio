const router = require('express').Router();

router.get('/download/:format', (req, res) => {
  const { format } = req.params;
  
  if (!['pdf', 'docx'].includes(format)) {
    return res.status(400).json({ error: 'Invalid format. Use pdf or docx.' });
  }

  // Redirect to static file served by frontend
  const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/resume.${format}`);
});

module.exports = router;