import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Subscriber from "./models/Subscriber.js";
import sendWelcomeEmail from "./utils/sendEmail.js";
import ContactMessage from "./models/ContactMessage.js";
import sendContactEmail from "./utils/sendContactEmail.js";
import EpaperEdition from "./models/EpaperEdition.js";




const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API key
const API_KEY = process.env.GNEWS_API_KEY;

/* 🔹 MONGODB CONNECTION */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

function guessCategory(text = "") {
  const t = text.toLowerCase();

  if (t.includes("sport") || t.includes("match") || t.includes("cricket")) {
    return "sports";
  }
  if (t.includes("business") || t.includes("market") || t.includes("economy")) {
    return "business";
  }
  if (t.includes("politic") || t.includes("government") || t.includes("election")) {
    return "politics";
  }
  if (t.includes("tech") || t.includes("ai") || t.includes("software")) {
    return "technology";
  }

  return "general";
}



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

/*  E-PAPERS */
app.get("/epaper-news", async (req, res) => {
  const category = req.query.category || "general";

  const url = `https://gnews.io/api/v4/top-headlines?category=${category.toLowerCase()}&lang=en&max=25&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.articles || []);
  } catch (err) {
    res.status(500).json([]);
  }
});


app.get("/epaper/today", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const existingEdition = await EpaperEdition.findOne({ date: today });
    if (existingEdition) {
      return res.json({ source: "cache", edition: existingEdition });
    }

    const categories = ["general", "business", "sports", "technology", "politics"];
    let allArticles = [];

    for (const cat of categories) {
      const url = `https://gnews.io/api/v4/search?q=${cat}&lang=en&max=15&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      const normalized = (data.articles || []).map(a => ({
        title: a.title,
        description: a.description,
        image: a.image,
        url: a.url,
        source: a.source?.name,
        category: cat,   // 🔥 YAHI MAIN FIX
      }));

      allArticles.push(...normalized);
    }

    const newEdition = await EpaperEdition.create({
      date: today,
      articles: allArticles,
    });

    res.json({ source: "fresh", edition: newEdition });

  } catch (err) {
    console.error("Epaper error:", err);
    res.status(500).json({ error: "Failed to generate edition" });
  }
});



/* 🔹 SUBSCRIBE */
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // 1️⃣ Save email first
    await Subscriber.create({ email });

    // 2️⃣ Respond immediately (IMPORTANT)
    res.status(201).json({
      success: true,
      message: "Subscribed successfully 🎉",
    });

    // 3️⃣ Send email in background (non-blocking)
    sendWelcomeEmail(email).catch(err => {
      console.error("Email failed:", err.message);
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Already subscribed",
      });
    }

    console.error("Subscribe error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});


app.post("/contact", async (req, res) => {
  try {
    const { name, email, inquiryType, subject, message } = req.body;

    if (!name || !email || !inquiryType || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1️⃣ Save to MongoDB
    await ContactMessage.create({
      name,
      email,
      inquiryType,
      subject,
      message,
    });

    // 2️⃣ Respond SUCCESS immediately
    res.status(201).json({
      success: true,
      message: "Message sent successfully ✅",
    });

    // 3️⃣ Send email in background
    sendContactEmail({ name, email, inquiryType, subject, message })
      .then(() => console.log("📧 Contact email sent"))
      .catch(err =>
        console.error("❌ Email failed:", err.message)
      );

  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});



/* Search Icon result*/
app.get("/search-news", async (req, res) => {
  const q = req.query.q;

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    q
  )}&lang=en&max=20&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json({ articles: data.articles || [] });
  } catch (err) {
    res.status(500).json({ articles: [] });
  }
});





/* 🔹 START SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
