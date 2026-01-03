import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetch("https://news-aggregator-api-bm7g.onrender.com/epaper/today");
        const data = await res.json();

        // 🔐 SAFETY CHECK
        if (!data?.edition?.articles) {
          setError(true);
          return;
        }

        const found = data.edition.articles.find(
          (a) => a._id === id
        );

        if (!found) {
          setError(true);
          return;
        }

        setArticle(found);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  /* 🔄 STATES */
  if (loading) return <p>Loading article...</p>;

  if (error)
    return (
      <div style={{ padding: "40px" }}>
        <h2>Article not found</h2>
        <Link to="/epaper">← Back to Newspaper</Link>
      </div>
    );

  /* ✅ SAFE RENDER */
  return (
    <div className="article-page">
      <Link to="/e-paper" className="back-btn">← Back to Newspaper</Link>

      <h1>{article.title}</h1>
      <p><b>{article.source}</b></p>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          style={{ maxWidth: "100%", margin: "20px 0" }}
        />
      )}

      <p>{article.description}</p>

      <a href={article.url} target="_blank" rel="noreferrer" className="back-btn article-btn">
        Read original source →
      </a>
    </div>
  );
};

export default ArticlePage;
