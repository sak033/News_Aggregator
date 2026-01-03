import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import News from "./components/News";
import TopHeadlines from "./components/TopHeadlines";
import CountryNews from "./components/CountryNews";
import Contact from "./pages/Contact";
import About from "./pages/About";
import EPaper from "./pages/EPaper";
import ArticlePage from "./pages/ArticlePage";
import SearchResults from "./pages/SearchResults";
import ChatWidget from "./components/Chatbot/ChatWidget";

/* 👇 Layout wrapper */
function AppLayout() {
  const location = useLocation();

  // 👇 Hide header/footer ONLY for e-paper
  const isEPaper = location.pathname === "/e-paper";

  return (
    <div className="app-layout">
      {!isEPaper && <Header />}

      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/top-headlines/:country" element={<TopHeadlines />} />
        <Route path="/country/:iso" element={<CountryNews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/e-paper" element={<EPaper />} />
        
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/search" element={<SearchResults />} />


      </Routes>
      <ChatWidget />

      {!isEPaper && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
