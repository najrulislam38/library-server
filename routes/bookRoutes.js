const express = require("express");
const { addBook, getBooks } = require("./../controllers/bookController");
const router = express.Router();

// api
router.get("/", getBooks);
router.post("/add", addBook);

module.exports = router;
