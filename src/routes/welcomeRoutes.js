const express = require('express');
const WelcomeController = require('../controllers/welcomeController');

const router = express.Router();

router.get('/', WelcomeController.getWelcome);
router.get('/welcome', WelcomeController.getWelcome);

module.exports = router;