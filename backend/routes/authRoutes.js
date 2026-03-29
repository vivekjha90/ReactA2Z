const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');


router.post('/newUsers', register); // signup process routes
router.post('/login', login);       // login process routes

module.exports = router;