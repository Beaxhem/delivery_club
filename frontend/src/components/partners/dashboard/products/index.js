import React from "react";
import Metrics from "./metrics";
import Table from "./table";

const ProductsList = ({ set_url, company }) => {
  return (
    <div className="main">
      <Metrics products={company.products} />
      <Table set_url={(v) => set_url(v)} products={company.products} />
    </div>
  );
};

export default ProductsList;
