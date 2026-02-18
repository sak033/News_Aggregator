import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Loader from "./Loader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function NewsCarousel() {

  // same states as your News.jsx
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;
  const page = 1; // carousel usually shows featured news (page 1)

  // fetch news (same logic as your News.jsx)
  useEffect(() => {

    setIsLoading(true);
    setError(null);

    fetch(`https://news-aggregator-api-bm7g.onrender.com/all-news?page=${page}&pageSize=${pageSize}`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Network error");
        }

        return response.json();
      })

      .then((json) => {

        setData(json.data.articles || []);

      })

      .catch((err) => {

        console.error(err);
        setError("Failed to fetch news");

      })

      .finally(() => {

        setIsLoading(false);

      });

  }, []);

  // UI
  if (isLoading) return <Loader />;

  if (error) return <div>{error}</div>;

  return (

    <div className="carousel-container">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        slidesPerView={1}
      >

        {data.map((article) => (

          <SwiperSlide key={article._id}>

            <div className="carousel-card">

              <img
                src={article.image}
                alt={article.title}
                className="carousel-image"
              />

              <div className="carousel-overlay">

                <div className="carousel-source">
                  {article.source?.name} • {article.publishedAt}
                </div>

                <h2 className="carousel-title">
                  {article.title}
                </h2>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>

  );

}

export default NewsCarousel;
