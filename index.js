const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Root route - responds to http://localhost:8000
app.get('/', (req, res) => {
    res.send('Welcome to the Auth Project API');
});

// Other routes
app.use('/api/auth', authRouter); // Note the '/api/auth' prefix

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log('Database connection error:', err));
