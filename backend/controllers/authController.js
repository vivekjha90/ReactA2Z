const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// register
const register = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { name, phone, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ phone });
    if (user)
      return res
        .status(400)
        .json({ message: "Phone number already registered" });

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
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("accessToken", accessToken, { httpOnly: true,secure:true,sameSite:"None"});
    res.cookie("refreshToken", refreshToken, { httpOnly: true,secure:true,sameSite:"None" });
    res.status(200).json({
      role: user.role,
      name: user.name,
      phone: user.phone,
      message: "Login successful! ",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getMe = (req, res) => {
  res.json({
    id: req.user.id,
    role: req.user.role,
  });
};

const refresh = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, { httpOnly: true });

    res.json({ message: "Token refreshed" });
  } catch {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};
module.exports = { register, login, getMe,logout,refresh};
