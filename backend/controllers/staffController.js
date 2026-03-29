const Staff = require('../models/staff');

// Add Staff
const addStaff = async (req, res) => {
  try {
    const { name, role, phone } = req.body;

    const existing = await Staff.findOne({ phone });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Phone already exists"
      });
    }

    const newStaff = new Staff({ name, role, phone });
    await newStaff.save();

    res.status(201).json({
      success: true,
      message: "Staff added",
      data: newStaff
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get All
const getAllStaff = async (req, res) => {
  const staff = await Staff.find().sort({ createdAt: -1 });
  res.json({ data: staff });
};

// Delete
const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Staff deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
const updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Staff updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addStaff,
  getAllStaff,
  deleteStaff,
  updateStaff
};