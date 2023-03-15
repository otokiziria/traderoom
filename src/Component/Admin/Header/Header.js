import React from "react";
import store from "../../../Red/store";
import { getAuthAction } from "../../../Red";

function Header() {
  return (
    <nav
      className="topnav navbar navbar-expand shadow navbar-light bg-light"
      id="sidenavAccordion"
    >
      <span className="navbar-brand d-none d-sm-block active">
        Administrator
      </span>
      <ul className="navbar-nav align-items-center ml-auto">
        <li className="nav-item dropdown no-caret mr-3">
          <span
            className="nav-link "
            role="button"
            onClick={() => {
              localStorage.removeItem("token");
              store.dispatch(
                getAuthAction({ token: null, user: {}, isAuthenticated: false })
              );
              window.location.replace('/administrator');
            }}
          >
            <div className="d-none d-md-inline font-weight-500">Logout</div>
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
