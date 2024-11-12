const bcrypt = require('bcryptjs');

// Hash the password with salt rounds (default to 10)
exports.doHash = async (password, saltRounds = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

// Compare the entered password with the stored (hashed) password
exports.comparePassword = async (enteredPassword, storedPassword) => {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password: ' + error.message);
  }
};
