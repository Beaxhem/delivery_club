import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, isInCart } from "../../redux/actions/cart";
import Counter from "./counter";

const Product = ({ product, addToCart, cart }) => {
  const [isIn, set_isIn] = useState(false);

  const ifInCart = () => {
    set_isIn(isInCart(product));
  };

  useEffect(() => {
    ifInCart();
    //eslint-disable-next-line
  }, [cart]);

  return (
    <div className={`item_container mt-4 `}>
      <span
        className={`item product ${isIn ? "selected" : ""}`}
        style={{
          "--background": `url(${product.image ? product.image.url : ""})`,
          backgroundSize: "cover"
        }}
      >
        <div className="description d-flex flex-column">
          <span className="title">{product.title}</span>
          <span>{product.price} USD</span>
          {isIn ? (
            <Counter cart={cart} product={product} />
          ) : (
            <button
              style={{ "--color": "#0ec645", width: "40%" }}
              onClick={() => addToCart(product)}
              className="bottom-right m-3 main_button inversed sm"
            >
              Add to cart
            </button>
          )}
        </div>
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.items,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
