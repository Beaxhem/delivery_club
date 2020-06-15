import React from "react";
import Loading from "./loading";

const LoadingComponent = ({ component, isLoading, items }) => {
  if (isLoading) {
    return <Loading />;
  } else if (!items) {
    return <div>Not found</div>;
  } else {
    return component;
  }
};

export default LoadingComponent;
