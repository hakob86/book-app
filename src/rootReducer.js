import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const BOOKS_COUNT = 30;

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (withReset = true, { getState }) => {
    const { searchValue, startIndex, orderBy, printType } = getState();
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&startIndex=${startIndex}&maxResults=${BOOKS_COUNT}&orderBy=${orderBy}&printType=${printType}`
    );
    const data = await response.json();
    return { data, withReset };
  }
);

const initialState = {
  books: [],
  loading: false,
  hasHttpError: false,
  hasData: true,
  totalItems: null,
  startIndex: 0,
  searchValue: "",
  orderBy: "relevance",
  printType: "all",
  isFinished: false,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setStartIndex: (state, { payload }) => {
      state.startIndex = payload;
    },
    addStartIndex: (state) => {
      state.startIndex += BOOKS_COUNT;
    },
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
    setOrderBy: (state, { payload }) => {
      state.orderBy = payload;
    },
    setPrintType: (state, { payload }) => {
      state.printType = payload;
    },
    clearBooksData: (state) => {
      state.books = [];
    },
  },
  extraReducers: {
    [getBooks.pending]: (state) => {
      state.loading = true;
      state.hasHttpError = false;
    },
    [getBooks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const { totalItems, items } = payload.data;
      state.hasData = totalItems > 0;
      state.isFinished = false;
      if (items) {
        state.books = payload.withReset ? items : state.books.concat(items);
        state.totalItems = totalItems;
      } else {
        state.isFinished = true;
      }
    },
    [getBooks.rejected]: (state) => {
      state.loading = false;
      state.hasHttpError = true;
    },
  },
});

export const {
  setStartIndex,
  setSearchValue,
  addStartIndex,
  clearBooksData,
  setOrderBy,
  setPrintType,
} = booksSlice.actions;

export default booksSlice.reducer;

export const store = configureStore({
  reducer: booksSlice.reducer,
});
