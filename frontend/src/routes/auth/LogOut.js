import React from "react";

const LogOut = (props) => {
  localStorage.removeItem("token");

  props.history.push("/");

  return <div></div>;
};

export default LogOut;
