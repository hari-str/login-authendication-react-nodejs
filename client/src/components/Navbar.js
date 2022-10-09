import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            REACT JS
          </NavLink>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  <button type="button" class="btn btn-light">
                    Login
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link" href="">
                  <button type="button" class="btn btn-primary">
                    SignUp
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
