import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Loader from "./Loader";

function CountryNews() {
  const { iso } = useParams();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;
  //const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

  function handlePrev() {
    if (page > 1) setPage(page - 1);
  }

  function handleNext() {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
  `http://localhost:3000/country/${iso}?page=${page}&pageSize=${pageSize}`
)

      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((json) => {
        setData(json.data.articles || []);
        setTotalResults(json.data.totalArticles || 0);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, [page, iso]);

  return (
    <>
      {error && (
        <div className="text-red-500 mb-4 text-center">{error}</div>
      )}
       
      <div className="my-10 cards  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-6">
        {isLoading ? (
          <Loader />
        ) : data.length > 0 ? (
          data.map((article) => (
          <Card key={article.id} article={article} />
          ))

        ) : (
          <p className="text-center col-span-full">
            No news articles found for this country.
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
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}

export default CountryNews;
