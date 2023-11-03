// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PROJECT_NAME } from "layouts/layoutConstants";

// assets
import bulgaria from "assets/bulgaria.png";
import uk from "assets/uk.png";

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {PROJECT_NAME}
        </Link>
        <div className="ms-auto d-flex">
          <div className="language-icons mx-2">
            <img
              src={bulgaria}
              alt="Bulgarian"
              className="mx-1 landing-page-flags"
              onClick={() => changeLanguage("bg")}
            />
            <img
              src={uk}
              alt="English"
              className="mx-1 landing-page-flags"
              onClick={() => changeLanguage("en")}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;