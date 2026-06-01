const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword, name });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, avatar: user.avatar } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCredentials = async (req, res) => {
  try {
    const { email, newPassword, name, avatar } = req.body;
    const userId = req.user.userId; // From authMiddleware

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email) user.email = email;
    if (name) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    res.json({ 
      message: 'Updated successfully.',
      user: { id: user._id, email: user.email, name: user.name, avatar: user.avatar }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during update' });
  }
};
