const Content = require("../models/Content");
const fetchVideos = require("../services/fetchVideos");
const fetchNews = require("../services/fetchNews");
const fetchAI = require("../services/fetchAI");

const updateContent = async () => {
  try {
    const [videos, news, aiArticles] = await Promise.all([
      fetchVideos(),
      fetchNews(),
      fetchAI(),
    ]);

    await Content.deleteMany({});
    await Content.insertMany([...videos, ...news, ...aiArticles]);

    console.log("Content Updated Successfully");
  } catch (error) {
    console.error("Error updating content", error);
  }
};

module.exports = updateContent;
