const express = require('express');
const router = express.Router();
const { register, login, getMe,refresh,logout} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/newUsers', register); 
router.post('/login', login);       
router.get('/me',authMiddleware,getMe);
router.post('/refresh', refresh);
router.post('/logout', logout);
module.exports = router;