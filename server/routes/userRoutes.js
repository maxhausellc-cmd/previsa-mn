const express = require('express');
const { registerUser, loginUser, getUserStatus, updatePhoneNumber, acceptTerms } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Public routes (Auth)
router.post('/register', registerUser); // Basic registration (optional, but needed if no Google OAuth is implemented)
router.post('/login', loginUser);       // Standard login (Admin login goes here)

// Authenticated routes
router.get('/status', protect, getUserStatus);
router.post('/phone', protect, updatePhoneNumber);
router.post('/accept-terms', protect, acceptTerms);

module.exports = router;