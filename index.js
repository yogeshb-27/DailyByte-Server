const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
const apiKey = process.env.NEWS_API_KEY;

app.get("/api/news", async (req, res) => {
  const { category, q } = req.query;
  try {
    const response = await axios.get(`${process.env.NEWS_API_URL}`, {
      params: {
        q,
        apiKey,
        category,
        country: "in",
        pageSize: 100,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
