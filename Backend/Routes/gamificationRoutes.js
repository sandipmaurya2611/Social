const express = require("express");
const router = express.Router();
const User = require("../models/game");
const awardBadge = require("../utils/awardBadge");

router.post("/action/:action", async (req, res) => {
  const { userId } = req.body;
  const { action } = req.params;

  const user = await User.findById(userId);
  if (!user) return res.status(404).send("User not found");

  await awardBadge(user, action);
  res.status(200).json({ success: true, user });
});

module.exports = router;
