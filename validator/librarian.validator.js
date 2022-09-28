const validate = require('./schema/librarian.schema');

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

exports.login = (req, res, next) => {
    try {
        const { value, error } = validate.login.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};