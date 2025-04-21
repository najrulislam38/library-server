const Loan = require("./../models/loanModel");
const User = require("./../models/userModel");
const Book = require("../models/bookModel");

const borrowedBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book || book.availableCopies < 1) {
      return res.status(404).send({
        success: true,
        message: "This book is not available.",
      });
    }

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);

    const newLoan = new Loan({
      user: userId,
      book: bookId,
      returnDate,
    });

    newLoan.save();

    book.availableCopies -= 1;
    book.borrowedCount += 1;

    await book.save();

    await User.findByIdAndUpdate(userId, {
      $push: { borrowedBooks: newLoan._id },
    });

    res.status(201).send({
      success: true,
      message: "Book borrowed successfully.",
      data: newLoad,
    });
  } catch (error) {
    {
      res.status(500).send({
        success: false,
        message: "Could not borrow book",
      });
    }
  }
};

const returnBook = async (req, res) => {
  try {
    const { loanId } = req.body;

    const loan = await Loan.findById(loanId).populate("book", "title author");

    if (!loan || loan.status === "returned") {
      return res.status(404).send({
        success: false,
        message: "Invalid loan request.",
      });
    }

    loan.returnDate = new Date();
    loan.status = "returned";

    await loan.save();

    loan.book.availableCopies += 1;

    await loan.save();
    res.status(200).send({
      success: true,
      message: "Book returned successfully.",
      data: loan,
    });
  } catch (error) {
    res.status(500),
      send({
        success: false,
        message: "Could not return book",
      });
  }
};

module.exports = { borrowedBook, returnBook };
