import React from "react";
import Slider from "react-slick";

let discounts = [
  {
    name: "30% Discount",
    image_url: "https://www.delivery-club.ru/pcs/selections/img_5ecfbf898be8d2.00639891_480x300.jpg"
  },
  {
    name: "Test name",
    image_url: "https://www.delivery-club.ru/pcs/selections/img_5df0b8a2480b64.80011329_480x300.jpg"
  },
  {
    name: "Test name",
    image_url: "https://www.delivery-club.ru/pcs/selections/img_5ea1cdaecd1745.14383875_480x300.jpg"
  },
  {
    name: "Test name",
    image_url: "https://www.delivery-club.ru/pcs/selections/img_5ebe6b13883c41.96358433_480x300.jpg"
  },
  {
    name: "Test name",
    image_url: ""
  },
  {
    name: "Test name",
    image_url: ""
  },
];

const Discounts = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="discounts">
      <Slider {...settings}>
        {discounts.map((item, i) => (
          <span key={i} className="item_container ">
            <div style={{background: `url(${item.image_url})`, backgroundSize: "cover"}} className="item">
            </div>
          </span>
        ))}
      </Slider>
    </div>
  );
};

export default Discounts;
