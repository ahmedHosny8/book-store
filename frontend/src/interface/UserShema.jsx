import Joi from "joi";
// Sign-up schema
export const UsersShemasign = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#_])[A-Za-z\\d@$!%*?&#_]{6,}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Min 6 characters with upper, lower, number, and special char",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }).with("password", "confirmPassword");

// Login schema
export const UsersShemalogin = Joi.object({
  password: Joi.string()
    .min(6)
    .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#_])[A-Za-z\\d@$!%*?&#_]{6,}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Min 6 characters with upper, lower, number, and special char",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});


