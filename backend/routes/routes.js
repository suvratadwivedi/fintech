const express = require('express');
const { submitContactForm } = require('../controllers/contactUs');

const router = express.Router();

router.post('/contactus', submitContactForm);

module.exports = router;