import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container">
        {props.userData ? (
          <>
            <Link className="navbar-brand" to={"/profile"}>
              <i className="fa-solid fa-note-sticky me-2"></i>
              Notes
            </Link>
          </>
        ) : (
          <>
            <Link className="navbar-brand" to={"/login"}>
              <i className="fa-solid fa-note-sticky me-2"></i>
              Notes
            </Link>
          </>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {props.userData ? (
              <>
                <i className="logout fa-solid fa-right-from-bracket ">
                  <span onClick={props.logOut} className=" dropdown-item">
                    Logout
                  </span>
                </i>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={"/login"}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Login
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to={"/register"}>
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={"/login"}>
                        Login
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
