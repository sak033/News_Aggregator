import React from "react";
import NewsCarousel from "../components/NewsCarousel";
import News from "../components/News";

function Home() {
  return (
    <div>

      {/* MSN style carousel */}
      <NewsCarousel />

      {/* normal news grid */}
      <News />

    </div>
  );
}

export default Home;
