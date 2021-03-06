import React from "react";
import Form from "../../components/auth/login/index";
import Header from "../../components/header/empty_header";

const Page = () => {
  return (
    <>
      <Header />
      <div className="auth-container">
        <Form />
      </div>
    </>
  );
};

export default Page;
