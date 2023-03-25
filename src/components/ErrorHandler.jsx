import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import notFound from "./../images/not-found.webp";
import noData from "./../images/no-data.png";

const ErrorHandler = ({ children }) => {
  const { hasData, hasHttpError } = useSelector(
    ({ hasData, hasHttpError }) => ({
      hasData,
      hasHttpError,
    }),
    shallowEqual
  );
  if (hasHttpError) {
    return (
      <div className="error_wrapper">
        <h2>Something Went Wrong!</h2>
        <img src={notFound} alt="404" />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="error_wrapper">
        <img src={noData} alt="Something went wrong" />
      </div>
    );
  }
  return <>{children}</>;
};

export default ErrorHandler;
