import React, { useState, useEffect } from "react";
import Card from "./Card";
import Loader from "./Loader";

function News() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;

  // ✅ GNews setup
 // const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
  const keyword = "world"; // default global keyword

  function handlePrev() {
    if (page > 1) setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)

      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((json) => {
        // ✅ Correct GNews response handling
        setData(json.data.articles || []);
        setTotalResults(json.data.totalArticles || 0);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
    <div className="page-offset page-spacing">
      <div className="my-10 cards  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-6">
        {isLoading ? (
          <Loader />
        ) : data.length > 0 ? (
          data.map((article) => (
        <Card key={article.id} article={article} />
         ))

        ) : (
          <p className="text-center col-span-full">
            No news articles found.
          </p>
        )}
      </div>

      {!isLoading && totalResults > pageSize && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            ← Prev
          </button>

          <p className="page font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>

          <button
            className="pagination-btn"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
        
      )}

      </div>
    </>
  );
}

export default News;
