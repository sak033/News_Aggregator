import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./SearchResults.css"

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/search-news?q=${query}`
      );
      const data = await res.json();
      setResults(data.articles || []);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (loading) return <p>Searching...</p>;

  return (
    <div className="page">
      <h2>Search results for “{query}”</h2>

      {results.length === 0 && <p>No results found.</p>}

      <div className="search-grid">
  {results.map((a, i) => (
    <div key={i} className="search-card">

      {a.image && (
        <img
          src={a.image}
          alt={a.title}
          className="search-image"
        />
      )}

      <div className="search-content">
        <h3 className="search-headline">{a.title}</h3>
        <p className="search-desc">{a.description}</p>

        <div className="search-footer">
          <span className="source">{a.source?.name}</span>

          <a
            href={a.url}
            target="_blank"
            rel="noreferrer"
            className="read-link"
          >
            Read →
          </a>
        </div>
      </div>

    </div>
  ))}
</div>

    </div>
  );
};

export default SearchResults;
