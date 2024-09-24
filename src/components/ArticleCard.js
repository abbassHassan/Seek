import React from "react";
import "./ArticleCard.css";

const ArticleCard = ({ title, date, content, highlightText, searchTerm }) => {
  return (
    <div className="article-card">
      <h2>{highlightText(title, searchTerm)}</h2>
      <p className="article-date">{date}</p>
      <p>{highlightText(content, searchTerm)}</p>
    </div>
  );
};

export default ArticleCard;
