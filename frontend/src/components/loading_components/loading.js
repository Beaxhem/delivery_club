import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <div className="loader">
      <BeatLoader size={10} color={"#0ec645"} loading />
    </div>
  );
};

export default Loading;
