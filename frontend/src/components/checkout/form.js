import React, { useState } from "react";
import { connect } from "react-redux";
import Counter from "../company_view/counter";
import Axios from "axios";
import App from "./test";
import { Link } from "react-router-dom";

const Form = ({ cart, total }) => {
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const submit = (payment) => {
    const { billing_details } = payment;

    const payload = {
      number: billing_details.phone,
      address: address,
      comment: comment,
      name: billing_details.name,
      email: billing_details.email,
      items: cart,
    };

    Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/orders/create`,
      payload
    ).then((res) => console.log(res));
  };

  return (
    <div className="d-flex align-items-end flex-wrap-reverse">
      <div className="material-menu col-12 col-md-8 flex-column d-flex">
        <h2 className="bold">Delivery</h2>

        <App
          setAddress={(v) => setAddress(v)}
          setComment={(v) => setComment(v)}
          total={total}
          rootSubmit={(payment) => submit(payment)}
        />
      </div>
      <div className="material-sidebar col-12 col-md-4 ">
        <div className="row align-items-center">
          <h3 className="bold">Your order</h3>
          <Link className="ml-3" to="/">
            To catalog
          </Link>
        </div>

        {cart.map((cart_item, i) => (
          <div key={i} className="p-3 border-bottom d-flex flex-row">
            <img style={{width: "80px"}} src={`${process.env.REACT_APP_SERVER_URL}/${cart_item.item.image.url}`}/>
            <div>
              <span className="bold">{cart_item.item.title}</span>
              <span className="text-white class">
                <Counter product={cart_item.item} />
              </span>
            </div>
          </div>
        ))}
        <div className="pt-4 ml-3"><span className="font-weight-bold">Total</span>: {total}</div>
        <div className="position-absolute bottom"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  total: state.cart.total,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
