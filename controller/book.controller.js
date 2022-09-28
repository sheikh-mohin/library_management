const bookSchema = require("../schema/books.schema");
const { status, message } = require("../validator/utils");
const { getResponseStructure } = require("../constants/response.structure");

exports.register = async (req, res) => {
    try {
        const book = new bookSchema({
            book_name: req.body.book_name,
            title: req.body.title,
            publisher: req.body.publisher,
            author: req.body.author,
            quantity: req.body.quantity,
            price: req.body.price,
            issueDate: req.body.issueDate,
        });
        const findBook = await bookSchema.find({
            book_name: book["book_name"], title: book['title'], publisher: book['publisher']
        });
        if (findBook["length"] !== 0) {
            return res
                .status(status.conflict)
                .send(
                    getResponseStructure(status.conflict, "Book" + message.alreadyExist)
                );
        }
        await book.save()
            .then(() => {
                return res
                    .status(status.successCreated)
                    .send(
                        getResponseStructure(
                            status.successCreated,
                            "book" + message.successCreated
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

exports.get = async (req, res) => {
    try {
        let page = 1;
        let perPage = 20;
        if (req.query["page"] > 1) {
            page = req.query["page"];
        }
        const books = await bookSchema.find({ isDeleted: false }, {
            book_name: 1,
            title: 1,
            publisher: 1,
            author: 1,
            quantity: 1,
            price: 1,
            issueDate: 1,
            numberOfIssue: 1,
        })
            .skip(page * perPage - perPage)
            .limit(perPage)
            .sort({ book_name: 'asc' });
        if (books['length'] === 0) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Book" + message.notFound));
        }
        let Total_Quantity = 0;
        books.map((r) => {
            return Total_Quantity += r['quantity']
        });
        const totalCount = await bookSchema.countDocuments({ isDeleted: false });
        let totalPages = Math.ceil(totalCount / perPage);
        let nextPage = page + 1;
        if (page === totalPages) {
            nextPage = totalPages;
        }
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, "Books fetch Successfully",
                {
                    Books: books,
                    Total_books: totalCount,
                    Total_quantity: Total_Quantity,
                    Page: page,
                    Next_page: nextPage,
                    Total_pages: totalPages,
                }));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.getBook = async (req, res) => {
    try {
        const books = await bookSchema.findOne({ _id: req.params.id, isDeleted: false }, {
            book_name: 1,
            title: 1,
            publisher: 1,
            author: 1,
            quantity: 1,
            price: 1,
            issueDate: 1,
            numberOfIssue: 1
        })
            .sort({ book_name: 'asc' });
        if (books['length'] === 0) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Book" + message.notFound));
        }
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, "Books fetch Successfully", books));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.update = async (req, res) => {
    try {
        let books = await bookSchema.find({ _id: req.body.id, isDeleted: false }, {
            book_name: 1,
            title: 1,
            publisher: 1,
            author: 1,
            quantity: 1,
            price: 1,
            issueDate: 1
        });
        books = books[0]
        if (!books) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Book" + message.notFound));
        }
        books.book_name = req.body.book_name;
        books.title = req.body.title;
        books.publisher = req.body.publisher;
        books.author = req.body.author;
        books.quantity = req.body.quantity;
        books.price = req.body.price;
        books.updatedAt = new Date();
        await bookSchema.updateOne({ _id: books._id }, books)
            .then(() => {
                return res
                    .status(status.success)
                    .send(
                        getResponseStructure(status.success, message.success)
                    );
            })
            .catch(err => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.conflict, err.toString()));
            });
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.remove = async (req, res) => {
    try {
        let books = await bookSchema.find({ _id: req.query.id, isDeleted: false }, {
            isDeleted: 1,
            updatedAt: 1,
        });
        books = books[0]
        if (!books) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Book" + message.notFound));
        }
        books.isDeleted = true;
        books.updatedAt = new Date();
        await bookSchema.updateOne({ _id: books._id }, books)
            .then(() => {
                return res
                    .status(status.success)
                    .send(
                        getResponseStructure(status.success, message.success)
                    );
            })
            .catch(err => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.conflict, err.toString()));
            });
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
}