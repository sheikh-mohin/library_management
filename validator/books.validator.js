const validate = require('./schema/books.validator');

exports.register = (req, res, next) => {
    try {
        const { value, error } = validate.register.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.update = (req, res, next) => {
    try {
        const { value, error } = validate.modify.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.delete = (req, res, next) => {
    try {
        const { value, error } = validate.delete.validate(req.query);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};