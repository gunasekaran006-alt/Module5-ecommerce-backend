const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: { success: false, message: "Too many attempts" }
});

router.post('/register', authController.register);
router.post('/login-step1', loginLimiter, authController.loginStep1);
router.post('/login-step2', authController.loginStep2);

module.exports = router;