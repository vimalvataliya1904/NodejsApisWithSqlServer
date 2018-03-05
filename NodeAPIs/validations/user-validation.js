const Joi = require('joi');

exports.SignUpValidation = Joi.object({
    username: Joi.string().required().min(2).max(50),
    password: Joi.string().required().min(8).max(50),
    firstname: Joi.string().required().max(50),
    lastname: Joi.allow(),
    mobileno: Joi.allow(),
    email: Joi.string().email()
});


exports.SignInValidation = Joi.object({
    username: Joi.string().required().max(50),
    password: Joi.string().required().min(8).max(50)
});