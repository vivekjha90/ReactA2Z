const express = require('express');

const router = express.Router();
const visitorCtrl = require('../controllers/visitorController');
const sendSMS = require('../services/twilioService');
const Visitor= require('../models/visitor');
router.get('/', visitorCtrl.getAllVisitors);
router.post('/', visitorCtrl.createVisitor);
router.put('/:id', visitorCtrl.updateVisitor);
router.delete('/:id', visitorCtrl.deleteVisitor);

router.get('/reminders', async (req, res) => {
  try {
    const data = await Visitor.find({ reminderSent: true });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/send-reminder/:id', async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
 console.log("Visitor:", visitor);
    await sendSMS(visitor.phone, visitor.name);
console.log("SMS would be sent to:", visitor.phone);
    visitor.reminderSent = true;
    visitor.reminderSentAt = new Date();
    visitor.reminderCount += 1; // 
    await visitor.save();

    res.json({ message: "Reminder sent successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
