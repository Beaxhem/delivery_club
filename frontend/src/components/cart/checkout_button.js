import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = ({ total }) => {
  return (
    <Link
      className="main_button lg inversed d-flex justify-content-between"
      style={{ "--color": "#0ec645" }}
      to="/checkout"
    >
      <span>Checkout</span>
      <span>${total}</span>
    </Link>
  );
};

const mapStateToProps = (state) => ({
  total: state.cart.total,
});

export default connect(mapStateToProps)(Checkout);
