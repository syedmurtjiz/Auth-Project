const bcrypt = require('bcryptjs');

const doHash = async (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

module.exports = { doHash };

// Hash the password with a salt rounds of 10
exports.doHash = async (password, saltRounds) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// Compare the entered password with the hashed password
exports.comparePassword = async (enteredPassword, storedPassword) => {
  try {
    return await bcrypt.compare(enteredPassword, storedPassword);
  } catch (error) {
    throw new Error('Error comparing password');
  }
};
