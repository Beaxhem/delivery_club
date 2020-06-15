import React, { useState } from "react";
import Axios from "axios";

const AddForm = ({ set_url, company }) => {
  const [title, set_title] = useState("");
  const [category, set_category] = useState("");
  const [price, set_price] = useState(0);
  const [image_id, set_image_id] = useState(-1);

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
      title,
      category,
      price,
      image_id,
      company_id: company.id,
    };

    Axios.post(`${process.env.REACT_APP_SERVER_URL}/products/new`, payload)
      .then((res) => {
        if (res.data.ok) {
          set_url("products");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  return (
    <div className="main">
      <div className="p-sides bg-white rounded my_shadow d-flex flex-column ">
        <button
          className="main_button sm inversed w-100 mb-3"
          style={{ "--color": "#0ec645" }}
          onClick={() => set_url("products")}
        >
          Back to products
        </button>

        <div className="md-form-limit d-flex flex-column">
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => set_title(e.target.value)}
            id="title"
            type="text"
          />

          <label htmlFor="title">Category</label>
          <input
            onChange={(e) => set_category(e.target.value)}
            id="category"
            type="text"
          />

          <label htmlFor="title">Price</label>
          <input
            onChange={(e) => set_price(e.target.value)}
            id="price"
            type="text"
          />

          <label htmlFor="image">Image</label>
          <input onChange={(e) => upload(e)} id="image" type="file" />

          <button
            style={{ "--color": "#0ec645" }}
            className="main_button lg inversed w-100"
            onClick={() => submit()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
