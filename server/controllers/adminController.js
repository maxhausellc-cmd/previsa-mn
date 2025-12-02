const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    (ONE-TIME USE) Creates an admin user based on ADMIN_EMAIL in .env
// @route   POST /api/admin/seed-admin
// @access  Public (Should be deleted or protected after first run)
exports.seedAdmin = async (req, res) => {
    const { password } = req.body;
    const email = process.env.ADMIN_EMAIL;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Admin email/password required.' });
    }
    
    try {
        let user = await User.findOne({ email });
        if (user && user.role === 'admin') {
            return res.json({ success: true, message: 'Admin user already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.findOneAndUpdate(
            { email },
            { email, password: hashedPassword, role: 'admin' },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        
        res.status(201).json({ success: true, message: `Admin user (${email}) seeded successfully.` });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get all users with pending payments
// @route   GET /api/admin/payments
// @access  Private/Admin
exports.getPaymentQueue = async (req, res) => {
    try {
        const users = await User.find({ paymentStatus: 'pending' }).select('-password');
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Verify user payment and grant access
// @route   POST /api/admin/verify/:userId
// @access  Private/Admin
exports.verifyPayment = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { 
                paymentStatus: 'confirmed',
                isPaid: true,
                accessToVisa: true
            },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, message: 'Payment verified and access granted', user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Cancel user payment and revoke access
// @route   POST /api/admin/cancel/:userId
// @access  Private/Admin
exports.cancelPayment = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { 
                paymentStatus: 'cancelled',
                isPaid: false,
                accessToVisa: false
            },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, message: 'Payment cancelled and access revoked', user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};