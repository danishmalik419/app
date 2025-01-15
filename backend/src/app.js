require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());


// Configure CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5174', // Allow this origin (frontend)
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions)); // Apply CORS middleware

// Routes
app.use('/api/auth', authRoutes);
app.use('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
