const Specialist = require('../models/specialist');

// GET all specialists
exports.getAllSpecialists = async (req, res) => {
  try {
    const specialists = await Specialist.find().sort({ createdAt: -1 });
    res.status(200).json(specialists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new specialist
exports.createSpecialist = async (req, res) => {
  try {
   
    const newSpec = new Specialist(req.body);
    const savedSpec = await newSpec.save(); // Must have 'await'
    res.status(201).json(savedSpec);
  } catch (err) {
    console.error("Save Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Update a specialist
exports.updateSpecialist = async (req, res) => {
  try {
    const updatedSpec = await Specialist.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedSpec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a specialist
exports.deleteSpecialist = async (req, res) => {
  try {
    await Specialist.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Specialist removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
