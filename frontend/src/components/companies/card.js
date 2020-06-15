import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Card = ({ item, rating = 4, items }) => {
  let myRef = React.createRef();

  useEffect(() => {
    if (item.scrollTo) {
      ReactDOM.findDOMNode(myRef.current).scrollIntoView();
    }
    //eslint-disable-next-line
  }, [items]);

  return (
    <div ref={myRef} className="item_container mt-4">
      <Link
        to={`/company/${item.slug}`}
        className="item company"
        style={{ "--background": `url(${item.image ? item.image.url : ""})` }}
      >
        <div className="description">
          <span className="title">{item.name}</span>
          <div>
            <span className="rating">
              <FontAwesomeIcon icon={faStar} /> {rating.toPrecision(2)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
