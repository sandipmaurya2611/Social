const axios = require("axios");

// Function to fetch books from Google Books API
const fetchGoogleBooks = async (req, res) => {
  const query = req.query.q || "programming"; // Search query (default: programming)
  const apiKey = "YOUR_GOOGLE_API_KEY"; // Replace with your actual Google Books API key

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
    const books = response.data.items || [];  // Google Books API returns items array
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

module.exports = {
  fetchGoogleBooks
};
