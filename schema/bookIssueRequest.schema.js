const mongoose = require('mongoose');

const bookIssueSchema = new mongoose.Schema({
    issueTo: {
        type: String,
        require: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BOOK",
        require: true
    },
    issueDate: {
        type: Date,
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

module.exports = mongoose.model('BOOK_ISSUE_REQUEST', bookIssueSchema);