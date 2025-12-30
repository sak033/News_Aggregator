import React from "react";

function Card({ article }) {
  return (
    <div className="everything-card  bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 h-full">
      
      <h2 className="title">{article.title}</h2>

      {article.image && (
        <img
          className="everything-card-img mx-auto"
          src={article.image}
          alt={article.title}
        />
      )}

      <p className="description-text leading-7">
        {article.description?.slice(0, 200)}...
      </p>

      <div className="info text-sm flex flex-col gap-1">
        <p>
          <span className="font-semibold">Source:</span>{" "}
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {article.source?.name}
          </a>
        </p>

        <p>
          <span className="font-semibold">Country:</span>{" "}
          {article.source?.country?.toUpperCase()}
        </p>

        <p>
          <span className="font-semibold">Published:</span>{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default Card;
