import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBooksData,
  getBooks,
  setSearchValue,
  setStartIndex,
} from "../rootReducer";
import SearchIcon from "./../images/search.png";

const SearchInput = () => {
  const searchValue = useSelector(({ searchValue }) => searchValue);
  let dispatch = useDispatch();

  const handleSubmit = () => {
    if (searchValue.length > 0) {
      dispatch(clearBooksData());
      dispatch(setStartIndex(0));
      dispatch(getBooks());
    }
  };

  return (
    <div className="search-input-wrapper">
      <input
        className="search-input"
        placeholder="Find book"
        type="text"
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <img
        className="search-icon"
        src={SearchIcon}
        onClick={handleSubmit}
        alt="search"
      />
    </div>
  );
};

export default SearchInput;
