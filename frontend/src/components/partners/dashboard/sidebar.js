import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ tabs, set_url, current_url }) => {
  const [opened, set_opened] = useState(false);

  return (
    <div className="sidebar border-bottom">
      <div className="top-header d-flex align-items-center justify-content-between ">
        <Link className="logo " to="/">
          <img alt="Logo" src="/logo.png" />
        </Link>
        <span
          onClick={() => set_opened(!opened)}
          className="d-flex d-md-none mr-3"
        >
          <FontAwesomeIcon size="lg" icon={faBars} />
        </span>
      </div>

      <div className={`content ${opened ? "opened" : ""}`}>
        {tabs.map((tab, i) => {
          if (tab.title) {
            return (
              <span
                onClick={() => set_url(tab.url)}
                key={i}
                className={current_url === tab.url ? "active" : ""}
                to={tab.url}
              >
                {tab.title}
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
