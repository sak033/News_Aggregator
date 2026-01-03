import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Loader from "./Loader";

function TopHeadlines() {
  const { category } = useParams();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;
  
 // const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const categoryParam = category ? `&category=${category}` : "";

    fetch(`https://news-aggregator-api-bm7g.onrender.com/top-headlines?lang=en${categoryParam}&page=${page}&pageSize=${pageSize}`)

      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json.data.articles || []);
        setTotalResults(json.data.totalArticles || 0);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch news. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, category]);

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
       <div className="page-offset  page-spacing">
      <div className="my-10 cards  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-6">
        {isLoading ? (
          <Loader />
        ) : data.length > 0 ? (
          data.map((article) => (
         <Card key={article.id} article={article} />
          ))

        ) : (
          <p className="text-center col-span-full">
            No articles found.
          </p>
        )}
      </div>

      {!isLoading && totalResults > pageSize && (
        <div className="pagination flex justify-center gap-8 my-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="pagination-btn"
          >
            ← Prev
          </button>

          <span className="page">{page}</span>

          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={() => setPage(page + 1)}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}
      </div>
    </>
  );
}

export default TopHeadlines;
