const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
exports.protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Get token from header (Format: Bearer <token>)
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user object to the request
        req.user = decoded.id; 
        
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Token is invalid or expired' });
    }
};

// Middleware to restrict access to Admin role
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user);

        if (user && user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ success: false, error: 'Forbidden. Admin access required.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error during admin check' });
    }
};