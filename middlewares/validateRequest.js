const Joi = require('joi'); // Ensure Joi is imported

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next(); // Proceed to the next middleware if validation is successful
  };
};
