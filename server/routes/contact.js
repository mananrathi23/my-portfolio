// routes/contact.js
const router = require('express').Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const protect = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', protect, getContacts); // Admin only

module.exports = router;
