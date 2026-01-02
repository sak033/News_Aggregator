import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  url: String,
  category: String,
  source: String,
});

const EpaperEditionSchema = new mongoose.Schema({
  date: {
    type: String, // "2026-01-01"
    unique: true,
    required: true,
  },
  articles: [ArticleSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EpaperEdition", EpaperEditionSchema);
