const express = require('express');
express.Router();
const validator = require('../validator/librarian.validator');
const api = require('../controller/librarian.controller');

module.exports = (router) => {
    router.post('/librarian/register', validator.register, api.create);
    router.post('/librarian/login', validator.login, api.login);
    return router;
};