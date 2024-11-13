const Post = require('../models/postsModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Get the userId from the JWT token (which is set in `req.user` by the protect middleware)
    const userId = req.user._id;

    // Create new post
    const newPost = new Post({ title, description, userId });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get posts of the authenticated user
exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id; // Get the userId from the JWT token

    // Fetch posts created by the authenticated user
    const posts = await Post.find({ userId });

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
