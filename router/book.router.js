const express = require('express');
express.Router();
const { verifyToken, checkLibrarian } = require("../middleware/middleware");
const validator = require('../validator/books.validator');
const api = require('../controller/book.controller');

module.exports = (router) => {
    router.post('/book/register', verifyToken, checkLibrarian, validator.register, api.register);
    router.get('/book/fetch/:id', verifyToken, checkLibrarian, api.getBook);
    router.get('/book/fetch', verifyToken, checkLibrarian, api.get);
    router.patch('/book/modify', verifyToken, checkLibrarian, validator.update, api.update);
    router.delete('/book/remove', verifyToken, checkLibrarian, validator.delete, api.remove);
    return router;
};