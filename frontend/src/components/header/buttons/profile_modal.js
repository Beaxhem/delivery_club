import React from "react";
import { isLoggedIn, getProfile } from "../../auth/utils";
import { Link } from "react-router-dom";

const Modal = ({ opened }) => {
  const loggedIn = isLoggedIn();

  const Logged = () => {
    const profile = getProfile();
    const isCompany = () => {
      if (profile.user_claims.slug) {
        return true;
      }

      return false;
    };

    return isCompany ? (
      <div className="d-flex mr-3">
        <Link className="mr-3 text-secondary small" to="/partners/dashboard">
          Dashboard
        </Link>
        <Link className="text-secondary small text-nowrap" to="/log_out">
          Log out
        </Link>
      </div>
    ) : (
      <div className="d-flex mr-3">
        <Link className="text-secondary small" to="/profile/orders">
          My orders
        </Link>
        <Link className="text-secondary small text-nowrap" to="/log_out">
          Log out
        </Link>
      </div>
    );
  };

  const Unlogged = () => {
    return (
      <div className="d-flex mr-3 ">
        <Link className="mr-3 text-secondary small" to="/login">
          Login
        </Link>
        <Link className="text-secondary small" to="/register">
          Register
        </Link>
      </div>
    );
  };

  return (
    <div className={`${opened ? "" : "d-none"} button-dropdown`}>
      {loggedIn ? <Logged /> : <Unlogged />}
    </div>
  );
};

export default Modal;
