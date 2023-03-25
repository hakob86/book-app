import React, { useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "./App.css";
import ErrorHandler from "./components/ErrorHandler";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import { addStartIndex, getBooks } from "./rootReducer";
import loadingGif from "./images/loading-gif.gif";

function App() {
  const { loading, isFinished } = useSelector(
    ({ loading, isFinished }) => ({
      loading,
      isFinished,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const onScroll = useCallback(() => {
    if (loading || isFinished) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 500) {
      dispatch(addStartIndex());
      dispatch(getBooks(false));
    }
  }, [loading, dispatch, isFinished]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
  return (
    <div>
      <Header />

      <ErrorHandler>
        <SearchResults />
        {loading && (
          <div className="loading-wrapper">
            <img alt="loading..." width={50} src={loadingGif} />
          </div>
        )}
      </ErrorHandler>
    </div>
  );
}

export default App;
