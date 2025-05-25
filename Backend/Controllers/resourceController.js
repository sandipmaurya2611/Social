const scrapeResources = require("../services/scrapeResources");

const getLiveResources = async (req, res) => {
  try {
    const data = await scrapeResources();
    res.json(data);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

module.exports = { getLiveResources };