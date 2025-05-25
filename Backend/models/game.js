const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  points: { type: Number, default: 0 },
  badges: [String],
  completedContent: [String],
  resourcesShared: [String],
  helpedUsers: [String],
});

module.exports = mongoose.model("game", userSchema);
