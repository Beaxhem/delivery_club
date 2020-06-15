import React, { useState } from "react";
import Container from "../container";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

const Form = (props) => {
  const history = useHistory();
  const [error, set_error] = useState("");
  const [username, set_username] = useState("");
  const [email, set_email] = useState("");
  const [number, set_number] = useState("");
  const [password, set_password] = useState("");

  const submit = () => {
    const payload = {
      username,
      email,
      number,
      password,
    };

    Axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, payload)
      .then((json) => {
        return json.data;
      })
      .then((json) => {
        if (json.ok) {
          history.push("/login");
        } else {
          set_error(json.message);
        }
      })
      .catch((error) => {
        set_error(error.response.data.message);
      });
  };

  return (
    <Container>
      <div className="main d-flex flex-column">
        <center>
          <h2 className="mb-4">Register</h2>
        </center>
        {error ? <p className="error">{error}</p> : ""}

        <input
          type="username"
          onChange={(e) => set_username(e.target.value)}
          placeholder={"Your name"}
        />
        <input
          type="email"
          onChange={(e) => set_email(e.target.value)}
          placeholder={"Email"}
        />
        <input
          onChange={(e) => set_number(e.target.value)}
          placeholder={"Phone number"}
        />
        <input
          type="password"
          onChange={(e) => set_password(e.target.value)}
          placeholder={"Password"}
        />

        <center>
          <button
            style={{ "--color": "#0ec645" }}
            className="main_button mt-4 inversed"
            onClick={() => submit()}
          >
            Sign up
          </button>
          <p className="small">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </center>
      </div>
    </Container>
  );
};

export default Form;
