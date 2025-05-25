const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function fetchAI() {
  const categories = ["Personal Development", "Science", "Health"];
  let aiContent = [];

  for (let category of categories) {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `Write an informative article about ${category}.`,
      max_tokens: 200,
      messages: [{ role: "user", content: "Your query here" }],
    });

    aiContent.push({
      category,
      type: "ai_article",
      title: `AI Generated: ${category}`,
      url: "#",
      description: response.choices[0].text,
    });
  }

  return aiContent;
}

module.exports = fetchAI;
