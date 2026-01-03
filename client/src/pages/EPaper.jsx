import React, { useEffect, useState } from "react";
import "./epaper.css";
import { Link } from "react-router-dom";




const SECTIONS = {
  General: "general",
  Politics: "politics",
  Business: "business",
  Sports: "sports",
  Technology: "technology",
};

const Epaper = () => {
  const [edition, setEdition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("general");
  const [downloadMode, setDownloadMode] = useState(false);


  const today = new Date().toDateString();
  const allSections = Object.values(SECTIONS);


  /* 🔹 Fetch TODAY'S EDITION — ONLY ONCE */
  useEffect(() => {
    const fetchEdition = async () => {
      try {
        const res = await fetch("https://news-aggregator-api-bm7g.onrender.com/epaper/today");
        const data = await res.json();
        setEdition(data.edition);
      } catch (err) {
        console.error("Failed to load edition", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEdition();
  }, []);

  /* 🔹 Filter articles by section (NO API CALL) */
  const filteredArticles = edition
    ? edition.articles.filter(
        (article) => article.category === activeSection
      )
    : [];

  /* 🔹 Loading state */
  if (loading) {
    return <div className="epaper-loading">Loading today’s newspaper…</div>;
  }

  /* 🔹 Safety */
  if (!edition) {
    return <div className="epaper-loading">Edition not available</div>;
  }


  const handleDownloadEdition = () => {
  setDownloadMode(true);

  // allow React to render ALL sections first
  setTimeout(() => {
    window.print();       // browser download dialog
    setDownloadMode(false);
  }, 600);
};

const renderSection = (section) => {
  const articles = edition.articles.filter(
    (a) => a.category === section
  );

  if (!articles.length) return null;

  return (
    <div className="print-section">
      <h1 className="print-section-title">
        {section.toUpperCase()}
      </h1>

      {/* LEAD + SIDE */}
      <section className="toi-top">
        <div className="toi-lead">
          {articles[0]?.image && (
            <img src={articles[0].image} alt={articles[0].title} />
          )}
          <h2>{articles[0]?.title}</h2>
          <p>{articles[0]?.description}</p>
        </div>

        <aside className="toi-side">
  {articles.slice(1, 6).map((a) => (
    <Link
      key={a._id}
      to={`/article/${a._id}`}
      className="toi-side-item"
    >
      <h4>{a.title}</h4>
    </Link>
  ))}
</aside>

      </section>

      {/* COLUMNS */}
      <section className="toi-columns">
  {articles.slice(6).map((a) => (
    <Link
      key={a._id}
      to={`/article/${a._id}`}
      className="toi-article"
    >
      <h4>{a.title}</h4>
      <p>{a.description}</p>
    </Link>
  ))}
</section>

    </div>
  );
};



  return (
    
    <div className="epaper-page print-root">
      {/* Back */}
      <Link to="/" className="back-btn">← Back to Home</Link>

      {/* Masthead */}
      <header className="epaper-header">
        <h1 className="epaper-title">News Aggregator</h1>
        <p className="epaper-subtitle">
          {today} • Digital Edition
          <button className="print-btn" onClick={handleDownloadEdition}>
            Download Full Edition
          </button>
        </p>
      </header>

      <hr />

      {/* Section Tabs */}
      <nav className="epaper-tabs" role="tablist">
        {Object.keys(SECTIONS).map((label) => {
          const key = SECTIONS[label];
          return (
            <button
              key={label}
              role="tab"
              aria-selected={key === activeSection}
              className={`tab ${key === activeSection ? "active" : ""}`}
              onClick={() => setActiveSection(key)}
            >
              {label.toUpperCase()}
            </button>
          );
        })}
      </nav>

      {/* Newspaper Body */}
      <main className="toi-layout">

  {/* NORMAL VIEW */}
  {!downloadMode && (
    <>
      {!filteredArticles.length && (
        <p className="no-news">No articles available in this section.</p>
      )}
      {renderSection(activeSection)}
    </>
  )}

  {/* DOWNLOAD VIEW — FULL NEWSPAPER */}
  {downloadMode && (
    <>
      {allSections.map((section) => (
        <div key={section}>
          {renderSection(section)}
        </div>
      ))}
    </>
  )}

</main>

      <footer className="epaper-footer">
        © {new Date().getFullYear()} News Aggregator • Digital Newspaper
      </footer>
    </div>
    
  );
};

export default Epaper;
