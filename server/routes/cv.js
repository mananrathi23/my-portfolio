const router = require('express').Router();
const { downloadCV, getDownloadStats } = require('../controllers/cvController');
const protect = require('../middleware/auth');

router.get('/download/:format', downloadCV);
router.get('/stats', protect, getDownloadStats);

module.exports = router;
