const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Connect to database
connectDB().then(async () => {
    try {
        const count = await User.countDocuments();
        if (count === 0) {
            console.log('No users found, creating default admin...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({
                name: 'Admin',
                email: 'admin@autobill.com',
                password: hashedPassword
            });
            console.log('Default admin created: admin@autobill.com / admin123');
        }
    } catch (err) {
        console.error('Failed to seed admin user:', err);
    }
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));

// Basic Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Server is running properly' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
