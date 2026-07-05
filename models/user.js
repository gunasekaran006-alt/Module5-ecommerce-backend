const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  otpSecret: { type: String },
  failedAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);