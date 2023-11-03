import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { PROJECT_NAME } from "layouts/layoutConstants";

// assets
import logo from "assets/matrix_logo.svg";
import bulgaria from "assets/bulgaria.png";
import uk from "assets/uk.png";

import "./landing-page.css";

const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="container-fluid landing-page">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {PROJECT_NAME}
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
            <div className="navbar-nav ms-auto d-flex">
              <button
                className="btn-close btn-close-white mb-4 d-lg-none"
                aria-label="Close"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              />
              <Link to="/signin" className="mx-2">
                <Button
                  label={t("sign-in-btn")}
                  className="p-button-secondary w-100"
                />
              </Link>
              <Link to="/signup" className="mx-2">
                <Button
                  label={t("sign-up-btn")}
                  className="p-button-primary w-100"
                />
              </Link>
              <div className="language-icons mx-2">
                <img
                  src={bulgaria}
                  alt="English"
                  className="mx-1 landing-page-flags"
                  onClick={() => changeLanguage("bg")}
                />
                <img
                  src={uk}
                  alt="Bulgarian"
                  className="mx-1 landing-page-flags"
                  onClick={() => changeLanguage("en")}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="content text-center mt-5">
        <div className="text-center">
          <img src={logo} alt="Logo" className="logo mb-4" />
          <h1 className="mb-4">{PROJECT_NAME}</h1>
        </div>
        <h5 className="mb-4 landing-page-paragraph">
          {t("landing-page-subheader")}
        </h5>
        <p className="landing-page-paragraph">{t("landing-page-paragraph")}</p>
      </div>
    </div>
  );
};

export default LandingPage;
