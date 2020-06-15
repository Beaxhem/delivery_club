import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Cart = (props) => {
  return (
    <span>
      <Link
        to="/checkout"
        className={`button ${props.items ? "filled text-white" : ""}`}
      >
        Cart
      </Link>
    </span>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
