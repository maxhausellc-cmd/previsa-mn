const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ email, password: hashedPassword });
        
        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                success: true,
                id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get user payment/access status
// @route   GET /api/users/status
// @access  Private
exports.getUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('isPaid paymentStatus accessToVisa isTermsAccepted');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, status: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update user phone number
// @route   POST /api/users/phone
// @access  Private
exports.updatePhoneNumber = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user, { phoneNumber }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, message: 'Phone number updated', phoneNumber: user.phoneNumber });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    User accepts Terms of Service
// @route   POST /api/users/accept-terms
// @access  Private
exports.acceptTerms = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user, { isTermsAccepted: true }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, message: 'Terms accepted', isTermsAccepted: user.isTermsAccepted });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};