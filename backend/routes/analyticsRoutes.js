const express = require('express');
const router = express.Router();
const { getServiceAnalytics } = require('../controllers/analyticsController');


router.get('/service-stats', getServiceAnalytics);

module.exports = router;
