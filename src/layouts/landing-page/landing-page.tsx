import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

import logo from "assets/matrix_logo.svg";
import bulgaria from "assets/bulgaria.png";
import uk from "assets/uk.png";
import "./landing-page.css";

const LandingPage: React.FC = () => {
  return (
    <div className="container-fluid landing-page">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            EncryptEase
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="ms-auto d-flex">
              <Link to="/signin" className="mx-2">
                <Button label="Sign in" className="p-button-secondary" />
              </Link>
              <Link to="/signup">
                <Button label="Sign up" className="p-button-primary" />
              </Link>
              <div className="language-icons mx-2">
                <img
                  src={bulgaria}
                  alt="English"
                  className="mx-1 landing-page-flags"
                />
                <img
                  src={uk}
                  alt="Bulgarian"
                  className="mx-1 landing-page-flags"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="content text-center mt-5">
        <div className="text-center">
          <img src={logo} alt="Logo" className="logo mb-4" />
          <h1 className="mb-4">EncryptEase</h1>
        </div>
        <h5 className="mb-4 landing-page-paragraph">
          Easily encrypt and decrypt files at your fingertips.
        </h5>
        <p className="landing-page-paragraph">
          Upload a file, choose an encryption algorithm and secure your data
          with ease.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
