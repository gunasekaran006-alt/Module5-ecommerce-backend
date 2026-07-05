const express = require('express');
const router = express.Router();
const userProfile = require('../controllers/userProfile');
const { authorizeUser } = require('../middleware/authMiddleware');

router.get('/', authorizeUser, userProfile.getProfile);
router.put('/', authorizeUser, userProfile.updateProfile);

module.exports = router;