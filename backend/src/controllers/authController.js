const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    // Generate email verification token
    const verificationToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );

    const verificationUrl = `https://appbackend-danish.netlify.app/api/auth/verify-email/${verificationToken}`;
    const message = `Verify your email by clicking the link below:\n\n${verificationUrl}`;

    await sendEmail(email, 'Email Verification', message);

    res.status(201).json({ 
      status: true, 
      message: "User registered successfully. Verification email sent." 
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};



exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ status: false, message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ status: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: "Invalid or expired token" });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ status: false, message: "Email not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Invalid credentials" });
    }

    res.status(200).json({ 
      status: true, 
      message: "Login successful", 
      token: generateToken(user._id) 
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    await user.save();

    const resetUrl = `https://appfrontend-danish.netlify.app/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please use the link below to reset your password:\n\n${resetUrl}`;

    await sendEmail(user.email, 'Password Reset Request', message);

    res.status(200).json({ status: true, message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error sending email' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ status: false, message: 'Invalid or expired token' });
    }

    user.password = password;

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ status: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error resetting password' });
  }
};
