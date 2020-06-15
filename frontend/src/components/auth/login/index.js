import React, { useState, useEffect } from "react";
import Container from "../container";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";

const Form = ({ login, error, redirect }) => {
  const history = useHistory();

  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  const submit = () => {
    const payload = {
      email,
      password,
    };
    login(payload);
  };

  useEffect(() => {
    if (redirect) {
      history.push("/");
    }
  }, [history, redirect]);

  return (
    <span>
      <Container>
        <div className="main d-flex flex-column">
          <center>
            <h2 className="mb-4">Login</h2>
          </center>

          {error ? <p className="error">{error}</p> : ""}

          <input
            onChange={(e) => set_email(e.target.value)}
            placeholder={"Email"}
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
              Sign in
            </button>
            <p className="small">
              New to Delivery App? <Link to="/register">Sign up</Link>
            </p>
          </center>
        </div>
      </Container>
      <center>
        <Link className="under-bottom" to="/partners/login">
          Login for companies
        </Link>
      </center>
    </span>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  redirect: state.auth.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
