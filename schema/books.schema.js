const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_name: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    publisher: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    issueDate: {
        type: Date,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    numberOfIssue: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('BOOK', bookSchema);