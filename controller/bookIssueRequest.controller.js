const bookIssueSchema = require("../schema/bookIssueRequest.schema");
const bookSchema = require("../schema/books.schema");
const { status, message } = require("../validator/utils");
const { getResponseStructure } = require("../constants/response.structure");

exports.register = async (req, res) => {
    try {
        const bookIssueRequest = new bookIssueSchema({
            issueTo: req.body.issueTo,
            bookId: req.body.bookId,
            issueDate: req.body.issueDate,
        });
        const books = await bookSchema.findOne({ _id: bookIssueRequest["bookId"], isDeleted: false }, {
            quantity: 1,
            isDeleted: 1,
            updatedAt: 1,
        });
        if (!books) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Book" + message.notFound));
        }
        books.quantity = books.quantity - 1;
        books.updatedAt = new Date();
        await bookSchema.updateOne({ _id: books._id }, books);
        await bookIssueRequest.save()
            .then(() => {
                return res
                    .status(status.successCreated)
                    .send(
                        getResponseStructure(
                            status.successCreated,
                            "Book Issue Request" + message.successCreated
                        )
                    );
            })
            .catch(() => {
                return res
                    .status(status.badRequest)
                    .send(getResponseStructure(status.badRequest, message.badRequest));
            });
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};