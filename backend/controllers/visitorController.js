const Visitor = require('../models/visitor');

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
