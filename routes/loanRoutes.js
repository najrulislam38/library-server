const express = require("express");
const router = express.Router();
const { borrowedBook, returnBook } = require("./../controllers/loanController");

router.post("/borrow", borrowedBook);
router.post("/return", returnBook);

module.exports = router;
