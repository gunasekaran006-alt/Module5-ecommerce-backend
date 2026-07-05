const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OTPAuth = require('otpauth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  tls: { rejectUnauthorized: false } // solved timeout issues
});

exports.register = async (req, res) => {
  try {
    const { email, password , role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, role: role });
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.loginStep1 = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({ success: false, message: "Account locked temporarily" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= 3) {
        user.lockUntil = Date.now() + 2 * 60 * 1000;
        user.failedAttempts = 0;
      }
      await user.save();
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    user.failedAttempts = 0;
    user.lockUntil = undefined;
    if (!user.otpSecret) user.otpSecret = new OTPAuth.Secret({ size: 20 }).base32;
    await user.save();

    let totp = new OTPAuth.TOTP({
      issuer: "EcomApp", label: user.email, algorithm: "SHA1", digits: 6, period: 300, secret: user.otpSecret
    });
    
    const otpCode = totp.generate();
    await transporter.sendMail({
      from: 'security@ecomapp.com', to: user.email, subject: "Your OTP Code", text: `OTP: ${otpCode}`
    });

    res.status(200).json({ success: true, message: "OTP sent to email", email: user.email });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.loginStep2 = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid user" });

    let totp = new OTPAuth.TOTP({
      issuer: "EcomApp", label: user.email, algorithm: "SHA1", digits: 6, period: 300, secret: user.otpSecret
    });

    let isValidOTP = totp.validate({ token: otpCode, window: 1 });
    if (isValidOTP === null) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3600000 });  // secure - important for Render & sameSite - important for Cross-origin
    
    res.status(200).json({ success: true, message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};