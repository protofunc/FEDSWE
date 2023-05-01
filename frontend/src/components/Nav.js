import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/nav_lg.png";

export default function Nav() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#376896" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            height={65}
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/registration" className="nav-link">
              Register
            </Link>
            <Link to="/profile" className="nav-link">
              My Profile
            </Link>
            <Link to="http://127.0.0.1:5000/" target="_blank" className="nav-link">
              Rest API
            </Link>
            <Link to="https://developer.usajobs.gov/API-Reference/" target="_blank" className="nav-link">
              Jobs API
            </Link>
            <Link to="/careers" className="nav-link">
              Careers
            </Link>
            <Link to="/" className="nav-link">
              Sign In
            </Link>
            <Link to="/" className="nav-link">
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
