const axios = require("axios");
const cheerio = require("cheerio");

const scrapeResources = async () => {
  try {
    const url = "https://free-for.dev/"; // Example public site with categorized resources
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];

    $("h3").each((_, el) => {
      const category = $(el).text();
      const items = [];

      $(el)
        .nextUntil("h3", "ul")
        .find("li")
        .each((_, li) => {
          const name = $(li).find("a").first().text();
          const url = $(li).find("a").first().attr("href");
          const description = $(li).text().replace(name, "").trim();

          if (name && url) {
            items.push({ name, url, description });
          }
        });

      if (items.length > 0) {
        results.push({ category, resources: items });
      }
    });

    return results;
  } catch (error) {
    console.error("Scraping failed:", error);
    throw error;
  }
};

module.exports = scrapeResources;
