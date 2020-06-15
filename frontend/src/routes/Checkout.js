import React from "react";
import EmptyHeader from "../components/header/empty_header";
import { Container } from "react-bootstrap";
import Form from "../components/checkout/form";

const Checkout = () => {
  return (
    <>
      <EmptyHeader />
      <div className="position-absolute d-flex justify-content-center  w-100 h-100">
        <Container style={{ marginTop: "5.5rem" }}>
          <Form />
        </Container>
      </div>
    </>
  );
};

export default Checkout;
