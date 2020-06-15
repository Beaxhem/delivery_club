import React from "react";
import { Link } from "react-router-dom";

const Table = ({ set_url, products }) => {
  return (
    <div className="p-3 bg-white rounded my_shadow">
      <div className="d-flex justify-content-between align-items-start">
        <h2 className="bold">Products</h2>
        <div>
          <button
            onClick={() => set_url("add_product")}
            style={{ "--color": "#0ec645" }}
            className="main_button sm inversed"
          >
            Add+
          </button>
        </div>
      </div>
      <div style={{ overflowX: "scroll" }}>
        <table className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products ? (
              products.map((product, i) => (
                <tr key={i}>
                  <th>{product.id}</th>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link to="edit">Edit</Link>
                    <Link to="delete">Delete</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
