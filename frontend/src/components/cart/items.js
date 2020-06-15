import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Checkout from "./checkout_button";

const Empty = () => {
  return <div className="empty-cart">Empty cart</div>;
};

const Items = ({ items, remove_from_cart, is_pc }) => {
  const NotNull = () => {
    return (
      <>
        {items.map((item, i) => (
          <span className="cart_item" key={i}>
            <span
              className="thumbnail"
              style={{
                "--background": `url(${
                  item.item.image ? item.item.image.url : ""
                }`,
              }}
            >
              <span
                className="close"
                onClick={() => remove_from_cart(item.item)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </span>
            <span className="ml-3">
              <h5>{item.item.title}</h5>
              <p className="small text-secondary">
                {item.qty} x {item.item.price} = {item.qty * item.item.price}{" "}
                USD
              </p>
            </span>
          </span>
        ))}
        {is_pc ? (
          <div className="d-flex justify-content-center mt-3 buttons-row">
            <Checkout />
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  return items.length !== 0 ? <NotNull /> : <Empty />;
};

export default Items;
