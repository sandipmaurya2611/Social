import { useEffect, useState } from "react";
import axios from "axios";
import { fetchBooks } from "./api/GoogleBooks"; // Corrected import

const categories = [
  "All", "Climate", "Education", "Women Empowerment", "Technology",
  "Health", "Science", "Personal Development", "Other", "General"
];

export default function ContentLibrary() {
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("news");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataAvailable, setDataAvailable] = useState(true);

  useEffect(() => {
    if (type && category !== null) {
      fetchContent();
    }
  }, [category, type]);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    setDataAvailable(true);

    try {
      if (type === 'book') {
        // Fetch books if type is 'book'
        const books = await fetchBooks(category === "All" ? "bestsellers" : category); // Adjusted query for "All"
        if (books.length === 0) {
          setDataAvailable(false);
        }
        setContent(books.slice(0, 20)); // Show 20 books
      } else {
        // Fetch news or video based on type
        const url = type === "video" ? "http://localhost:8080/videos" : "http://localhost:8080/news";
        const { data } = await axios.get(url);
        let filteredData = data;
        if (category !== "All") {
          filteredData = data.filter(item => item.category?.toLowerCase() === category.toLowerCase());
        }
        if (filteredData.length === 0) {
          setDataAvailable(false);
        }
        setContent(filteredData);
      }
    } catch (err) {
      setError("Failed to fetch content. Please try again.");
      setDataAvailable(false);
    }
    setLoading(false);
  };

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto mb-4">
        <button 
          onClick={() => window.location.href = "/"} 
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg"
        >
          ⬅ Home
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📚 Content Library</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <select 
            onChange={e => setCategory(e.target.value)} 
            value={category} 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select 
            onChange={e => setType(e.target.value)} 
            value={type} 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="news">📰 News</option>
            <option value="video">🎥 Videos</option>
            <option value="book">📚 Books</option>
          </select>
        </div>

        {loading && <p className="text-center text-gray-600 text-lg">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && !dataAvailable && (
            <p className="text-center col-span-full text-gray-500">Content not available.</p>
          )}

          {!loading && dataAvailable && content.map((item, index) => (
            <div key={item.id || index} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              {type === "video" && item.url ? (
                <iframe 
                  width="100%" 
                  height="200" 
                  src={getEmbedUrl(item.url)} 
                  frameBorder="0" 
                  allowFullScreen 
                  className="w-full"
                />
              ) : type === "news" && item.image ? (
                <img src={item.image || item.thumbnail} alt="News" className="w-full h-48 object-cover" />
              ) : type === "book" && item.volumeInfo ? (
                <div className="w-full h-48 bg-gray-200">
                  <img src={item.volumeInfo.imageLinks?.thumbnail || "/default-book-image.jpg"} alt="Book" className="w-full h-full object-cover" />
                </div>
              ) : null}

              <div className="p-4">
                <h2 className="font-bold text-xl text-gray-800">{item.volumeInfo?.title || item.title}</h2>
                {type === "news" && <p className="text-gray-600">{item.description}</p>}
                {type === "book" && <p className="text-gray-600">{item.volumeInfo?.description || "No description available."}</p>}
                
                <a 
                  href={item.volumeInfo?.infoLink || item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-3 text-blue-500 font-semibold hover:underline"
                >
                  {type === "video" ? "Watch Video" : type === "book" ? "Read Book" : "Read More"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
