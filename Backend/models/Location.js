const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  selectedTags: {
    education: [String],
    environment: [String],
    health: [String],
    tech: [String],
    finance: [String],
    profession: [String]
  },
  latitude: Number,
  longitude: Number,
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
