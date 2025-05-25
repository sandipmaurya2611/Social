const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  category: String,
  type: String,  // 'video', 'news', 'ai_article'
  title: String,
  url: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Content", ContentSchema);
