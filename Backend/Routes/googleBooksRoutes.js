const express = require("express");
const router = express.Router();
const googleBooksController = require("../Controllers/googleBooksController");

// Google Books API Route
router.get("/google-books", googleBooksController.fetchGoogleBooks);

module.exports = router;
