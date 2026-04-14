const express = require('express');

const router = express.Router();
const visitorCtrl = require('../controllers/visitorController');
router.get('/', visitorCtrl.getAllVisitors);
router.post('/', visitorCtrl.createVisitor);
router.put('/:id', visitorCtrl.updateVisitor);
router.delete('/:id', visitorCtrl.deleteVisitor);

router.get('/reminders', visitorCtrl.getReminders);
router.post('/send-reminder/:id', visitorCtrl.sendReminder);

module.exports = router;
