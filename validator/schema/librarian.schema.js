const Joi = require('joi').extend(require('@joi/date'));  // Validation

exports.register = Joi.object({
    name: Joi.string().lowercase().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    gender: Joi.string().required().lowercase().valid(...['male', 'female', 'other']),
    mobileNumber: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPass: Joi.ref('password'),
    dob: Joi.date().format('YYYY-MM-DD').utc(),
});

exports.login = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    mobileNumber: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
}).or("email", "mobileNumber");