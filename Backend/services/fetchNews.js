const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function fetchNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

  console.log("Fetching news from URL:", url);

  try {
    const { data } = await axios.get(url);
    console.log("Raw API Response:", JSON.stringify(data, null, 2));

    if (!data.articles || data.articles.length === 0) {
      console.error("🚨 No news articles found!");
      return [];
    }

    return data.articles.map(news => ({
      category: "General",  // API se category nahi mil rahi, so manually "General" rakh raha hu
      type: "news",
      title: news.title || "No Title",
      url: news.url,
      description: news.description || "No Description",
      image: news.urlToImage || null, // News ke liye image bhi add kar diya
    }));
  } catch (error) {
    console.error("❌ Error fetching news:", error.response?.data || error.message);
    return [];
  }
}

fetchNews().then(console.log).catch(console.error);

module.exports = fetchNews;
