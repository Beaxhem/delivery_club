import React from "react";
import Header from "../components/header";
import { Container } from "react-bootstrap";
import Details from "../components/company_view/index";
import FullCart from "../components/cart/full_cart";

const DetailedView = (props) => {
  return (
    <div className="detailed-view">
      <Header />
      <Container fluid className="mb-5">
        <Details slug={props.match.params.slug} />
      </Container>
      <FullCart />
    </div>
  );
};

export default DetailedView;
