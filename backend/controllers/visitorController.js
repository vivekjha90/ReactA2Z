const Visitor = require('../models/visitor');
const sendSMS = require('../services/twilioService');
// Get all visitors
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.status(200).json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new check-in
exports.createVisitor = async (req, res) => {
  try {
    const newVisitor = new Visitor(req.body);
    const savedVisitor = await newVisitor.save();
    res.status(201).json(savedVisitor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update visitor details
exports.updateVisitor = async (req, res) => {
  try {
    const updated = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove a visitor
exports.deleteVisitor = async (req, res) => {
  try {
    await Visitor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Visitor removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all reminders
exports.getReminders = async (req, res) => {
  try {
    const data = await Visitor.find({ reminderSent: true });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send reminder
exports.sendReminder = async (req, res) => {
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
    visitor.reminderCount += 1;

    await visitor.save();

    res.json({ message: "Reminder sent successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
