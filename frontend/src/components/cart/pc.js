import React from "react";
import Items from "./items";

const PC = ({ items, rfc }) => {
  return (
    <span
      className={`cart cart-modal d-none d-sm-none d-md-flex p-3 flex-column `}
    >
      <div className="d-flex align-items-end">
        <h4 className="mb-0 bold">Your cart</h4>
        <p className="mb-0 ml-3">{items ? items.length : 0} items</p>
      </div>

      <div className="mt-3 body" id="style-1">
        <Items is_pc items={items} remove_from_cart={rfc} />
      </div>
    </span>
  );
};

export default PC;
