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



console.log("RESEND KEY:", process.env.RESEND_API_KEY ? "LOADED" : "MISSING");



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API key
const API_KEY = process.env.GNEWS_API_KEY;

/* MONGODB CONNECTION */
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



/* FETCH NEWS FUNCTION */
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

/*  ALL NEWS */
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

/* TOP-HEADLINES */
app.get("/top-headlines", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const country = req.query.country || "us";

  const url = `https://gnews.io/api/v4/top-headlines?country=${country}&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`;
  fetchNews(url, res);
});

/*  COUNTRY NEWS */
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
        category: cat,   
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



/*  SUBSCRIBE */
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // Save email first
    await Subscriber.create({ email });

    // Respond immediately (IMPORTANT)
    res.status(201).json({
      success: true,
      message: "Subscribed successfully 🎉",
    });

    // Send email in background (non-blocking)
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

    await ContactMessage.create({
      name,
      email,
      inquiryType,
      subject,
      message,
    });

    await sendContactEmail({
      name,
      email,
      inquiryType,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully ✅",
    });

  } catch (error) {
  console.error("CONTACT ERROR FULL:", error);

  res.status(500).json({
    success: false,
    message: error.message || "Email failed",
    error: error,
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


/* =========================
   CHATBOT API (NEW)
========================= */

app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.json({
      reply: "❗ Please type a message.",
      topic: null,
    });
  }

  const text = message.toLowerCase();

  /* 🔹 WEBSITE INFO / FAQ */
if (
  text.includes("about") ||
  text.includes("website") ||
  text.includes("this site") ||
  text.includes("platform")
) {
  return res.json({
    reply:
      "This is an AI-powered News Aggregator website that provides latest headlines, category-wise news, country-specific news, e-paper access, and search functionality.",
    topic: "about",
  });
}

if (
  text.includes("help") ||
  text.includes("how can you help") ||
  text.includes("what can you do")
) {
  return res.json({
    reply:
      "😊 I can help you with technology, sports, business news, e-paper, search, and website features.",
    topic: "help",
  });
}

/* 🔹 E-PAPER HELP */
if (
  text.includes("epaper") ||
  text.includes("e-paper") ||
  text.includes("newspaper") ||
  text.includes("e news paper")
) {
  return res.json({
    reply:
      "🗞️ To read the e-paper:\n\n1️⃣ Open the E-Paper section from the website menu\n2️⃣ Select today’s edition or category\n3️⃣ Click on any article to read it in full newspaper-style format.",
    topic: "epaper",
  });
}

  

  try {
    /* 🔹 TECHNOLOGY NEWS */
    if (text.includes("technology") || text.includes("tech")) {
      const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&max=5&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      const articles = (data.articles || []).slice(0, 5);

      let reply = "📰 Latest Technology News:\n\n";

      articles.forEach((a, i) => {
        reply += `${i + 1}. ${a.title}\n🔗 ${a.url}\n\n`;
      });

      return res.json({
        reply,
        topic: "technology",
      });
    }

/* 🔹 POSITIVE / SMALL TALK */
if (
  text.includes("great") ||
  text.includes("ohh") ||
  text.includes("nice") ||
  text.includes("cool") ||
  text.includes("awesome") ||
  text.includes("thanks") ||
  text.includes("thank you") ||
  text === "ok" ||
  text === "okay"
) {
  return res.json({
    reply: "😊 Glad to hear that! Let me know what you’d like to explore next.",
    topic: null,
  });
}


    /* 🔹 FALLBACK */
    return res.json({
      reply:
        "🤔 I can help you with technology, sports, business news, e-paper and website features.",
      topic: null,
    });

  } catch (error) {
    console.error("Chatbot error:", error.message);
    return res.status(500).json({
      reply: "⚠️ Sorry, I couldn't fetch news right now.",
      topic: null,
    });
  }
});



/* START SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
