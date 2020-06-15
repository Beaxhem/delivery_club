import React from "react";

const Metrics = ({ products }) => {
  return (
    <div className="row mb-4 metrics">
      <div className="col-6 col-md-3">
        <div
          className="metrica my_shadow bold"
          style={{ "--color": "#2D7DD2" }}
        >
          <h2>{products ? products.length : "..."}</h2>
          <div>Total number</div>
        </div>
      </div>
      <div className="col-6 col-md-3 bold">
        <div className="metrica my_shadow" style={{ "--color": "#97CC04" }}>
          <h2>{products ? products.length : "..."}</h2>
          <div>Total number</div>
        </div>
      </div>
      <div className="col-6 col-md-3 bold ">
        <div className="metrica my_shadow" style={{ "--color": "#F8DE37" }}>
          <h2>{products ? products.length : "..."}</h2>
          <div>Total number</div>
        </div>
      </div>
      <div className="col-6 col-md-3 bold ">
        <div className="metrica my_shadow" style={{ "--color": "#F45D01" }}>
          <h2>{products ? products.length : "..."}</h2>
          <div>Total number</div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
