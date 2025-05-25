import axios from "axios";

// Function to fetch books from the Google Books API
export const fetchBooks = async (category) => {
  try {
    const query = category === "All" ? "" : category;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
      params: {
        q: query,
        maxResults: 10,
      },
    });
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
