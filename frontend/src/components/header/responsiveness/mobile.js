import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const Mobile = () => {
  return (
    <>
      <FontAwesomeIcon className="mr-3" icon={faSearch} />
      <FontAwesomeIcon icon={faUser} />
    </>
  );
};

export default Mobile;
