import React, { useState, useEffect } from "react";
import Product from "./product";
import LoadingComponent from "../loading_components";

const Products = ({ products }) => {
  const [items, set_items] = useState([]);
  const [loading, set_loading] = useState(true);

  const group_by = (items, keyGetter) => {
    const map = new Map();
    items.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });

    return map;
  };

  const renderList = (map) => {
    let list = [];
    for (let [key, values] of map) {
      list.push(
        <span key={key}>
          <h3>{key}</h3>
          <div className="catalog d-flex flex-wrap">
            {values.map((value, i) => (
              <Product key={i} product={value} />
            ))}
          </div>
        </span>
      );
    }
    return list;
  };

  useEffect(() => {
    if (products) {
      set_items(group_by(products, (product) => product.category));
      if (products) set_loading(false);
    }
  }, [products]);

  return (
    <div className="mt-4 mb-4">
      <LoadingComponent
        component={renderList(items)}
        isLoading={loading}
        items={items}
      />
    </div>
  );
};

export default Products;
