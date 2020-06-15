import React from "react";
import { connect } from "react-redux";
import Mobile from "./mobile";
import PC from "./pc";
import { removeFromCart } from "../../redux/actions/cart";

const FullCart = (props) => {
  return (
    <>
      <Mobile items={props.items} rfc={props.remove_from_cart} />
      <PC items={props.items} rfc={props.remove_from_cart} />
    </>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
});

const mapDispatchToProps = (dispatch) => ({
  remove_from_cart: (item) => dispatch(removeFromCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullCart);
