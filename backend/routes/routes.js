const express = require('express');
const { submitContactForm, getAllContacts, getContactById } = require('../controllers/contactUs');

const router = express.Router();

// Routes for contact_us
router.post('/contactus', submitContactForm);
// router.get('/contactus', getAllContacts);
// router.get('/contactus/:id', getContactById);

module.exports = router;