import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Banner = ({ title, rating, slug, specialization, backgroundUrl }) => {
  return (
    <div
      className="company-banner d-flex flex-column align-items-center justify-content-center text-white"
      style={{
        "--background": `url(${backgroundUrl})`,
      }}
    >
      <h2>{title}</h2>
      <span>{specialization}</span>
      <div className="d-flex align-items-center">
        <span className="rating">
          <FontAwesomeIcon icon={faStar} />
          {rating.toPrecision(2)}
        </span>

        <Link to={`/reviews/${slug}`} className="text-white">
          <span className="reviews-btn">Reviews ></span>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
