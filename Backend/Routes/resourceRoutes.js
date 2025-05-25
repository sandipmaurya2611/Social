const express = require("express");
const router = express.Router();
const { getLiveResources } = require("../controllers/resourceController");

router.get("/live", getLiveResources);

module.exports = router;