const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function fetchVideos() {
  const categories = ["Climate", "Education", "Technology", "Health"];
  let videoData = [];

  for (let category of categories) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&key=${process.env.YOUTUBE_API_KEY}&type=video`;
    const { data } = await axios.get(url);

    videoData.push(
      ...data.items.map(video => ({
        category,
        type: "video",
        title: video.snippet.title,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        description: video.snippet.description,
      }))
    );
  }
  return videoData;
}

module.exports = fetchVideos;
