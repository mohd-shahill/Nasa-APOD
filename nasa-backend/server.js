const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// ✅ Correct CORS setup  
app.use(cors({
  origin: "https://apodfornasa.netlify.app", // Allow only your frontend  
  methods: "GET,POST",  
  allowedHeaders: "Content-Type"  
}));  

const API_KEY = process.env.NASA_API_KEY || "HzrcfhFHiMnTM1uBmd2ucqa7KCvuDM7wZHKfYeOR";

app.get("/search", async (req, res) => {
  try {
    const query = (req.query.query || "").toLowerCase();

    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: { api_key: API_KEY, count: 30, thumbs: true }
    });

    const data = response.data;
    const filtered = data.filter((item) => {
      const title = item.title ? item.title.toLowerCase() : "";
      const explanation = item.explanation ? item.explanation.toLowerCase() : "";
      return title.includes(query) || explanation.includes(query);
    });

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
