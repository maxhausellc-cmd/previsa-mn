const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    accessToVisa: {
        type: Boolean,
        default: false, // CRITICAL: Locked by default
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    isTermsAccepted: {
        type: Boolean,
        default: false, // Legal consent status
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', UserSchema);