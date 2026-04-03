const router = require('express').Router();
const { downloadCV } = require('../controllers/cvController');

// Public download only — no analytics, no auth
router.get('/download/:format', downloadCV);

module.exports = router;