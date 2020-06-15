import React, { useState } from "react";
import Container from "../../auth/container";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

const Form = () => {
  const history = useHistory();
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  const submit = () => {
    const payload = {
      email,
      password,
    };

    Axios.post(`${process.env.REACT_APP_SERVER_URL}/companies/login`, payload)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);

        if (data.ok) {
          localStorage.setItem("token", data.data.access_token);
          history.push("/partners/dashboard");
        }
      })
      .catch((e) => console.log(e.response));
  };

  return (
    <span>
      <Container>
        <div className="main d-flex flex-column">
          <center className="text-wrap">
            <h2 className="mb-4">Company login</h2>
          </center>

          <input
            onChange={(e) => set_email(e.target.value)}
            type="email"
            placeholder={"Contact email"}
          />
          <input
            onChange={(e) => set_password(e.target.value)}
            type="password"
            placeholder={"Password"}
          />

          <center>
            <button
              style={{ "--color": "#0ec645" }}
              className="main_button mt-4 inversed"
              onClick={() => submit()}
            >
              Sign in
            </button>
            <p className="small">
              New to Delivery Club? <Link to="/partners/register">Sign up</Link>
            </p>
          </center>
        </div>
      </Container>
      <center>
        <Link className="under-bottom" to="/login">
          Login for users
        </Link>
      </center>
    </span>
  );
};

export default Form;
