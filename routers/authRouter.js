// routers/authRouter.js
const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');
const { signupSchema, signinSchema } = require('../middlewares/validator');
const validateRequest = require('../middlewares/validateRequest');

// Sign up route with validation
router.post('/signup', validateRequest(signupSchema), signup);

// Sign in route with validation
router.post('/signin', validateRequest(signinSchema), signin);

// Signout route
router.post('/signout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
