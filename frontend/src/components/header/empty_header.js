import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import $ from "jquery";

const EmptyHeader = ({ pc_buttons, mobile_buttons }) => {
  var prevPos = $(window).scrollTop();

  $(window).scroll(function () {
    var header = document.getElementById("header");
    if (header) {
      var scroll = $(window).scrollTop();

      if ((scroll > 100) & (scroll - prevPos > 0)) {
        header.classList.add("hide");
      } else {
        header.classList.remove("hide");
      }
      prevPos = scroll;
    }
  });

  return (
    <nav className="header" id="header">
      <PCContainer buttons={pc_buttons} />
      <MobileContainer buttons={mobile_buttons} />
    </nav>
  );
};

const PCContainer = ({ buttons }) => {
  return (
    <div className="d-none d-sm-none d-md-flex align-items-center">
      <Link to="/" className="navbar-brand">
        <img alt="Logo" src="/logo.png" />
      </Link>

      <div className="buttons_container ">{buttons}</div>
    </div>
  );
};

const MobileContainer = ({ buttons }) => {
  return (
    <motion.div className="mobile-header d-flex d-md-none align-items-center justift-content-between">
      <Link to="/" className="navbar-brand">
        <img alt="Logo" src="/logo.png" />
      </Link>
      <span className="buttons_container mr-4">{buttons}</span>
    </motion.div>
  );
};

export default EmptyHeader;
