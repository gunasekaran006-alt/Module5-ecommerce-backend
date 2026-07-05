const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect Database
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes')); 
app.use('/api/profile', require('./routes/userProfileRoutes')); 

// Error Handler Middleware (Must be at the end)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});