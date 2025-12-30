import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Subscriber from "./models/Subscriber.js";
import sendWelcomeEmail from "./utils/sendEmail.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API key
const API_KEY = process.env.VITE_GNEWS_API_KEY;

/* 🔹 MONGODB CONNECTION */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

/* 🔹 FETCH NEWS FUNCTION */
async function fetchNews(url, res) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    res.json({
      status: 200,
      success: true,
      message:
        data.articles && data.articles.length > 0
          ? "Successfully fetched news articles"
          : "No news articles found",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Failed to fetch news articles",
      error: error.message,
    });
  }
}

/* 🔹 ALL NEWS */
app.get("/all-news", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 40;
  const page = parseInt(req.query.page) || 1;

  const keywords = [
    "world",
    "news",
    "global",
    "breaking",
    "headline",
    "international",
    "update",
    "report",
    "market",
    "economy",
    "stock",
    "finance",
  ];

  const keyword = keywords[(page - 1) % keywords.length];

  const url = `https://gnews.io/api/v4/search?q=${keyword}&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`;
  fetchNews(url, res);
});

/* 🔹 TOP HEADLINES */
app.get("/top-headlines", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const country = req.query.country || "us";

  const url = `https://gnews.io/api/v4/top-headlines?country=${country}&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`;
  fetchNews(url, res);
});

/* 🔹 COUNTRY NEWS */
app.get("/country/:iso", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const countryISO = req.params.iso || "us";

  const url = `https://gnews.io/api/v4/top-headlines?country=${countryISO}&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`;
  fetchNews(url, res);
});

/* 🔹 SUBSCRIBE */
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await Subscriber.create({ email });
    await sendWelcomeEmail(email);

    res.json({
      success: true,
      message: "Subscribed successfully 🎉 Check your email!!",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Already subscribed",
    });
  }
});

/* 🔹 START SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
