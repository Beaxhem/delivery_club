import React from "react";

const Container = ({ children }) => {
  return (
    <div className="auth-form">
      <div className="d-flex">
        <div className="d-none d-md-flex side">
          <img alt="decor" src="/auth_sidebar.webp" />
        </div>
        <div className="main">{children}</div>
      </div>
    </div>
  );
};

export default Container;
