const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// register
const register = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { name, phone, password, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ message: "Phone number already registered" });

        
        user = new User({ name, phone, password, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// login
const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            token,
            role: user.role,
            name: user.name,
            message: "Login successful! "
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { register, login };