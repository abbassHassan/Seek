import React from "react";
import "./SearchBox.css";

const SearchBox = ({ searchTerm, handleSearch }) => {
  return (
    <input
      type="text"
      className="search-box"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBox;
