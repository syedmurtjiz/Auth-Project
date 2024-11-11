const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: [true, "Email must be unique"],
    minLength: [5, "Email must have at least 5 characters!"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided!"],
    trim: true,
    select: false, // Make sure the password is not selected by default
  }
});

// Add a method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
