import React from "react";
import Header from "../../components/header/empty_header";
import Form from "../../components/partners/auth/Login";

const Login = () => {
  return (
    <>
      <Header />
      <div className="auth-container">
        <Form />
      </div>
    </>
  );
};

export default Login;
