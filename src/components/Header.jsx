import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getBooks, setOrderBy, setPrintType } from "../rootReducer";
import SearchInput from "./SearchInput";
import SelectFilter from "./SelectFilter";

// orderBy = relevance , newest

const Header = () => {
  const { orderBy, printType, books } = useSelector(
    ({ orderBy, books, printType }) => ({
      orderBy,
      printType,
      books,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const changePrintType = (event) => {
    dispatch(setPrintType(event.target.value));
    if (books.length > 0) {
      dispatch(getBooks());
    }
  };
  const changeOrderBy = (event) => {
    dispatch(setOrderBy(event.target.value));
    if (books.length > 0) {
      dispatch(getBooks());
    }
  };

  return (
    <div className="header-wrapper">
      <h1 className="heading">Search for books</h1>
      <div>
        <SearchInput />
      </div>
      <div className="select-filters-wrapper">
        <SelectFilter
          onChange={changePrintType}
          value={printType}
          title="Categories"
        >
          <option value="all">All</option>
          <option value="books">Books</option>
          <option value="magazines">Magazines</option>
        </SelectFilter>
        <SelectFilter
          onChange={changeOrderBy}
          value={orderBy}
          title="Sorting by"
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </SelectFilter>
      </div>
    </div>
  );
};

export default Header;
