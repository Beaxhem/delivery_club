import React, { useState } from "react";
import Container from "../../auth/container";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

const Form = () => {
  const history = useHistory();
  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [number, set_number] = useState("");
  const [specialization, set_specialization] = useState("");
  const [password, set_password] = useState("");
  const [image_id, set_image_id] = useState("");

  console.log(image_id)
  const upload = (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);

    Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/upload`,
      formData
    ).then((res) => set_image_id(res.data.data.id));
  };

  const submit = () => {
    const payload = {
      name,
      email,
      number,
      specialization,
      password,
      image_id
    };
    Axios.post(`${process.env.REACT_APP_SERVER_URL}/companies/new`, payload)
      .then((res) => res.data)
      .then((data) => {
        if (data.ok) {
          history.push("/partners/login");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      <div className="main d-flex flex-column">
        <center>
          <h2 className="mb-4">Register a company</h2>
        </center>

        <input
          onChange={(e) => set_name(e.target.value)}
          type="text"
          placeholder={"Company name"}
        />
        <input
          onChange={(e) => set_email(e.target.value)}
          type="email"
          placeholder={"Contact email"}
        />
        <input
          onChange={(e) => set_number(e.target.value)}
          placeholder={"Phone number"}
        />
        <input
          onChange={(e) => set_specialization(e.target.value)}
          type="text"
          placeholder={"Specialization"}
        />
        <input
          onChange={(e) => set_password(e.target.value)}
          type="password"
          placeholder={"Password"}
        />
        <label htmlFor="image">Image</label>
          <input onChange={(e) => upload(e)} id="image" type="file" />
        <center>
          <button
            style={{ "--color": "#0ec645" }}
            className="main_button mt-4 inversed"
            onClick={() => submit()}
          >
            Sign up
          </button>
          <p className="small">
            Already have an account? <Link to="/partners/login">Log in</Link>
          </p>
        </center>
      </div>
    </Container>
  );
};

export default Form;
