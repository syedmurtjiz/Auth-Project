require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sendMail = require('../middlewares/sendMail'); // Ensure the path is correct
const authRouter = require('../routers/authRouter'); // Correctly import the router

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Use the authRouter for routes related to authentication
app.use('/api/auth', authRouter);  // Make sure this path is correct

// POST route to send an email
app.post('/api/send-email', async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    // Call the sendMail function
    await sendMail(email, subject, message);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// Server setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
