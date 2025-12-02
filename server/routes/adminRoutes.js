const express = require('express');
const { getPaymentQueue, verifyPayment, cancelPayment, seedAdmin } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/auth');
const router = express.Router();

// --- CRITICAL ADMIN ROUTES ---
router.post('/seed-admin', seedAdmin); // One-time route to create the first admin user (MUST BE DELETED AFTER USE)

// All following routes require both protection and Admin role check
router.get('/payments', protect, isAdmin, getPaymentQueue);
router.post('/verify/:userId', protect, isAdmin, verifyPayment); // CRITICAL: Payment Confirmation
router.post('/cancel/:userId', protect, isAdmin, cancelPayment); // CRITICAL: Refund/Content Re-lock

module.exports = router;