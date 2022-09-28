const mongoose = require('mongoose');

const librarianSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    mobileNumber: {
        type: String,
        unique: true,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "librarian"
    },
    dob: {
        type: Date,
        default: ""
    },
    age: {
        type: Number,
        default: ""
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

module.exports = mongoose.model('LIBRARIAN', librarianSchema);