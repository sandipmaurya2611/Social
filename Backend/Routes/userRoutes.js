const express = require("express");
const router = express.Router();
const User = require("../models/Location");

router.post("/nearby", async (req, res) => {
  const { latitude, longitude, selectedTags } = req.body;

  if (!latitude || !longitude || typeof selectedTags !== "object") {
    return res.status(400).json({ message: "Missing required fields or invalid selectedTags" });
  }

  try {
    const maxDistance = 0.5; // degrees
    const nearbyUsers = await User.find({
      latitude: { $gte: latitude - maxDistance, $lte: latitude + maxDistance },
      longitude: { $gte: longitude - maxDistance, $lte: longitude + maxDistance }
    });

    const matchedUsers = nearbyUsers.filter((user) => {
      return Object.keys(selectedTags).some((category) => {
        const userTags = user.selectedTags[category] || [];
        const selected = selectedTags[category] || [];
        return selected.some((tag) => userTags.includes(tag));
      });
    });

    res.status(200).json(matchedUsers);
  } catch (error) {
    console.error("Error finding users nearby:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
