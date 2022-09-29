const Joi = require('joi').extend(require('@joi/date'));  // Validation

exports.register = Joi.object({
    book_name: Joi.string().lowercase().min(3).required(),
    title: Joi.string().lowercase().min(3).required(),
    publisher: Joi.string().lowercase().min(3).max(30).required(),
    author: Joi.string().lowercase().min(3).max(30).required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
});

exports.modify = Joi.object({
    id: Joi.string().required(),
    book_name: Joi.string().lowercase().min(3),
    title: Joi.string().lowercase().min(3),
    publisher: Joi.string().lowercase().min(3).max(30),
    author: Joi.string().lowercase().min(3).max(30),
    quantity: Joi.number(),
    price: Joi.number()
});

exports.checkId = Joi.object({
    id: Joi.string().required()
});