const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');
const { signupSchema, signinSchema } = require('../middlewares/validator'); // Correct import path for validator.js
const validateRequest = require('../middlewares/validateRequest');
const { protect } = require('../controllers/authController'); // Assuming 'protect' is in authController
const { createPost, getUserPosts } = require('../controllers/postController'); // Import postController

// Sign up route with validation
router.post('/signup', validateRequest(signupSchema), signup);

// Sign in route with validation
router.post('/signin', validateRequest(signinSchema), signin);

// Sign out route (client will handle the token removal)
router.post('/signout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Post routes (protected by JWT)
router.post('/posts', protect, createPost); // Only authenticated users can create posts
router.get('/posts', protect, getUserPosts); // Only authenticated users can view their posts

// Exporting the router to be used in the main app
module.exports = router;
