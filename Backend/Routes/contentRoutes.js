const express = require("express");
const { getContent } = require("../Controllers/contentController");

const router = express.Router();
router.get("/", getContent);

module.exports = router;
