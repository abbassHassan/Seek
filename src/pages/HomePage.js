import React, { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import SearchBox from "../components/SearchBox";
import "./HomePage.css";

const articles = [
  {
    title: "Understanding the difference between grid-template and grid-auto",
    date: "Oct 09, 2018",
    content:
      "With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties...",
  },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [foundCount, setFoundCount] = useState(0);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredArticles(articles);
      setFoundCount(0);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(term.toLowerCase()) ||
          article.content.toLowerCase().includes(term.toLowerCase())
      );

      setFilteredArticles(filtered);

      const count = filtered.reduce((acc, article) => {
        const titleMatches = (article.title.match(new RegExp(term, "gi")) || [])
          .length;
        const contentMatches = (
          article.content.match(new RegExp(term, "gi")) || []
        ).length;
        return acc + titleMatches + contentMatches;
      }, 0);

      setFoundCount(count);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="home-page">
      <h1>Search</h1>
      <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
      <p>
        {filteredArticles.length}{" "}
        {filteredArticles.length === 1 ? "post was" : "posts were"} found with{" "}
        {foundCount} {foundCount === 1 ? "occurrence" : "occurrences"} of the
        term.
      </p>
      <div className="articles-list">
        {filteredArticles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            date={article.date}
            content={article.content}
            highlightText={highlightText}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
