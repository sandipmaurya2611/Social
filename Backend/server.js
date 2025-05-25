require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AuthRouter = require("./Routes/AuthRouter"); 
const contentRoutes = require("./Routes/contentRoutes");
const updateContent = require("./Controllers/updateContent");
const fetchVideos = require("./services/fetchVideos");
const fetchNews = require("./services/fetchNews");
const fetchAI = require("./services/fetchAI");
const Content = require('./models/Content');
const googleBooksRoutes = require("./Routes/googleBooksRoutes");
const { Server } = require("socket.io");
const http = require("http");
const userRoutes = require("./Routes/userRoutes");
const resourceRoutes = require("./Routes/resourceRoutes");


require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
console.log("YouTube API Key:", process.env.YOUTUBE_API_KEY);

app.get("/ping", (req, res) => res.send("PONG"));
app.use("/auth", AuthRouter);
app.use("/content", contentRoutes);
app.use("/google-books", googleBooksRoutes);
app.use("/user", userRoutes);
//app.use("/location", locationRoutes);
// Routes
app.use('/api/responses', require('./Routes/responseRoutes'));
app.use("/api/resources", resourceRoutes);




app.get("/users/nearby", async (req, res) => {
  try {
    const users = await User.find(); // If using MongoDB
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});


app.get("/content", async (req, res) => {
  try {
      const content = await Content.find(); // Fetch from database
      res.json(content);
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
});

// 📌 API to fetch YouTube Videos
app.get("/videos", async (req, res) => {
  try {
      const videos = await VideoModel.find();  // Agar MongoDB use kar raha hai
      res.status(200).json(videos);
  } catch (error) {
      console.error("🔥 Error fetching videos:", error);  // Yeh error console me show karega
      res.status(500).json({ error: "Internal Server Error" });
  }
});


// 📌 API to fetch News Articles
app.get("/news", async (req, res) => {
  try {
    const category = req.query.category || "general"; // ✅ Default category
    const news = await fetchNews(category);
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Backend: userRoutes.js must be mounted in yo
app.use("/users", require("./Routes/userRoutes"));
app.use('/api/resources', require('./Routes/resources'));




// Auto Update Content Every 24 Hours
setInterval(updateContent, 24 * 60 * 60 * 1000);

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
