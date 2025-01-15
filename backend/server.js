require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./src/utils/db');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());



app.use(cors()); 

// Routes
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
