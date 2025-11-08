const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

// JWT generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// =====================
// REGISTER ADMIN
// =====================
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const admin = new Admin({ username, password });
    await admin.save();

    const token = generateToken(admin._id);
    res.status(201).json({ message: 'Admin registered', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================
// LOGIN ADMIN
// =====================
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username: username.trim() });
    if (!admin) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await admin.matchPassword(password.trim());
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = generateToken(admin._id);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================
// PROTECTED DASHBOARD
// =====================
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome Admin ${req.admin.username}` });
});

module.exports = router;
