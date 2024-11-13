const Joi = require("joi");

// Sign up validation schema
exports.signupSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .min(6)
    .max(60)
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .required()
    .messages({
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 8 characters long.",
      "any.required": "Password is required.",
    }),
});

// Sign in validation schema
exports.signinSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .min(6)
    .max(60)
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
  password: Joi.string()
    .required()
    .messages({
      "any.required": "Password is required.",
    }),
});
