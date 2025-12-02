const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- CRITICAL CORS CONFIGURATION ---
const frontendURL = process.env.FRONTEND_URL; // Vercel URL
const corsOptions = {
    origin: frontendURL,
    credentials: true, // Allow cookies/authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));
// ------------------------------------

app.use(express.json()); // Body parser middleware

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Simple health check endpoint
app.get('/', (req, res) => {
    res.send('Previsa MN Backend API is running!');
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));