import React from "react";
import { shallowEqual, useSelector } from "react-redux";

const SearchResults = () => {
  const { books, totalItems } = useSelector(
    (state) => ({ books: state.books, totalItems: state.totalItems }),
    shallowEqual
  );
  return (
    <div className="search-results-wrapper">
      {totalItems && (
        <h3 className="results-count">Found {totalItems} results</h3>
      )}
      <div className="search-results">
        {books.map((book) => {
          const { imageLinks, categories, authors, title } = book.volumeInfo;

          return (
            <div className="book-info-wrapper">
              <div className="book-image-wrapper">
                <img
                  src={imageLinks?.thumbnail}
                  alt="book"
                  className="book-image"
                  width={150}
                />
              </div>
              <div className="book-info">
                <div className="book-type">
                  {categories?.map((category) => (
                    <span>{category} </span>
                  ))}
                </div>
                <span className="book-description">{title}</span>
                <div className="book-author">
                  {authors?.map((author) => (
                    <span>{author} </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
