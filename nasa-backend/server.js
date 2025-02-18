// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
app.use(cors({
  origin: "*" // Allow all origins, or specify your frontend domain like "https://apodfornasa.netlify.app"
}));

// Use your NASA API key from environment variables or hardcode it (not recommended for production)
const API_KEY = process.env.NASA_API_KEY || 'HzrcfhFHiMnTM1uBmd2ucqa7KCvuDM7wZHKfYeOR';

app.get('/search', async (req, res) => {
  try {
    const query = (req.query.query || '').toLowerCase();
    // Fetch a sample of 30 APODs from NASA API
    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
      params: {
        api_key: API_KEY,
        count: 30,
        thumbs: true
      }
    });
    const data = response.data;
    // Filter the results based on the query, checking title and explanation
    const filtered = data.filter((item) => {
      const title = item.title ? item.title.toLowerCase() : "";
      const explanation = item.explanation ? item.explanation.toLowerCase() : "";
      return title.includes(query) || explanation.includes(query);
    });
    res.json(filtered);
  } catch (error) {
    console.error("Error fetching data from NASA API:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
