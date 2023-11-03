// src/layouts/authentication/sign-in/sign-in.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import Navbar from "layouts/components/navbar/navbar";
import logo from "assets/matrix_logo.svg";
import "./sign-in.css";

const SignIn: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: "40rem" }}>
        <div className="text-center">
          <img src={logo} alt="Logo" className="logo mb-4" />
          <h2 className="mb-4">{t("sign-in-header")}</h2>
        </div>
        <div className="card p-4">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="email">{t("email")}:</label>
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("email-placeholder")}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="p-field">
                <label htmlFor="password">{t("password")}:</label>
                <InputText
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("password-placeholder")}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" label={t("sign-in-btn")} className="mt-3" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
