const express = require('express');
express.Router();
const { verifyToken, checkLibrarian } = require("../middleware/middleware");
const validator = require('../validator/bookIssueRequest.validator');
const api = require('../controller/bookIssueRequest.controller');

module.exports = (router) => {
    router.post('/book/request/register', verifyToken, checkLibrarian, validator.register, api.register);
    return router;
};