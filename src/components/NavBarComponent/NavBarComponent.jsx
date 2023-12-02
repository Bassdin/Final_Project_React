import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import "./NavBarComponent.css";
import React from "react";


const NavBarComponent = () => {
  const userInfoRedux = useSelector((state) => state.auth.userData);
  const  isloggedin = !!userInfoRedux._id;
  const  isBusiness = !!userInfoRedux.biz;

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
        </NavLink>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={(navData) => {
                  return "nav-link " + (navData.isActive ? "activeLink" : "");
                }}
                aria-current="page"
                to="/home"
              >
                <FontAwesomeIcon /* icon={faDragon} */ />
                Home
              </NavLink>
            </li>
            {!isloggedin && <li className="nav-item">
              <NavLink
                className={(navData) => {
                  return "nav-link " + (navData.isActive ? "activeLink" : "");
                }}
                aria-current="page"
                to="/login"
              >
                Login
              </NavLink>
            </li>}
            <li className="nav-item">
              <NavLink
                className={(navData) => {
                  return "nav-link " + (navData.isActive ? "activeLink" : "");
                }}
                aria-current="page"
                to="/about"
              >
                About
              </NavLink>
            </li>
            {!isloggedin && <li className="nav-item">
              <NavLink
                className={(navData) => {
                  return "nav-link " + (navData.isActive ? "activeLink" : "");
                }}
                aria-current="page"
                to="/signup"
              >
                Signup
              </NavLink>
            </li>}
             {!isloggedin && <li className="nav-item">
              <NavLink
                className={(navData) => {
                  return "nav-link " + (navData.isActive ? "activeLink" : "");
                }}
                aria-current="page"
                to="/BusinessSignupPage"
              >
                Business Sign up Page
              </NavLink>
            </li>}
             {isBusiness && <li className="nav-item">
              <NavLink
                className={(navData) => {
                  return "nav-link " + (navData.isActive ? "activeLink" : "");
                }}
                aria-current="page"
                to="/CreateCardPage"
              >
                Create Card Page
              </NavLink>
            </li>}
            
            {isBusiness && isloggedin && <li className="nav-item">
              <NavLink
                className={(navData) => {
                  return "nav-link " + (navData.isActive ? "activeLink" : "");
                }}
                aria-current="page"
                to="/Mycardspanel"
              >
                My Cards Panel
              </NavLink>
            </li>}

            {isloggedin && <li className="nav-item">
              <NavLink
                className={(navData) => {
                  return "nav-link " + (navData.isActive ? "activeLink" : "");
                }}
                aria-current="page"
                to="/AllCardsPage"
              >
                All Cards
              </NavLink>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
