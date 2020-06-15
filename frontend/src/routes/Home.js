import React from "react";
import Header from "../components/header/index";
import { Container } from "react-bootstrap";
import Discounts from "../components/discounts/index";
import Companies from "../components/companies/index";

function App() {
  return (
    <div>
      <Header />
      <Container style={{ top: "100px" }} className="position-relative">
        <Discounts />
        <Companies />
      </Container>
    </div>
  );
}

export default App;
