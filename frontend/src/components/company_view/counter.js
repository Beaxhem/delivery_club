import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { get_count, increment, dicrement } from "../../redux/actions/cart";

const Counter = ({ product, cart, increment, dicrement }) => {
  const [count, set_count] = useState(1);

  useEffect(() => {
    set_count(get_count(product));
  }, [product, cart]);

  return (
    <span className="counter d-flex align-items-center ">
      <span onClick={() => dicrement(product)}>
        <FontAwesomeIcon icon={faMinus} />
      </span>

      <span className="count">{count}</span>
      <span onClick={() => increment(product)}>
        <FontAwesomeIcon icon={faPlus} />
      </span>
    </span>
  );
};

const mapDispatchToProps = (dispatch) => ({
  increment: (product) => dispatch(increment(product)),
  dicrement: (product) => dispatch(dicrement(product)),
});

export default connect(null, mapDispatchToProps)(Counter);
