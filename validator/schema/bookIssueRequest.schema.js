const Joi = require('joi').extend(require('@joi/date'));  // Validation

exports.register = Joi.object({
    issueTo: Joi.string().lowercase().min(3).max(30).required(),
    bookId: Joi.string().required(),
    issueDate: Joi.date().format('YYYY-MM-DD').utc(),
});