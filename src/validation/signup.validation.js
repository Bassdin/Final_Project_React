import Joi from "joi-browser";

const signupSchema = {
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(255).required(),
};

export default signupSchema;
