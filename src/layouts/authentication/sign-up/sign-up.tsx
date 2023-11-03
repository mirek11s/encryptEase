import React, { useState } from "react";
import { Link } from "react-router-dom";

// primereact components
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { CheckboxChangeEvent } from "primereact/checkbox";

import { validatePassword } from "layouts/layoutUtils";

import logo from "assets/matrix_logo.svg";
import "./sign-up.css";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
    termsNotAccepted: false,
    passwordRequirements: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setFormData({ ...formData, termsAccepted: !!e.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordMismatch = formData.password !== formData.confirmPassword;
    const termsNotAccepted = !formData.termsAccepted;
    const passwordRequirements = !validatePassword(formData.password);

    setErrors({ passwordMismatch, termsNotAccepted, passwordRequirements });

    if (!passwordMismatch && !termsNotAccepted && !passwordRequirements) {
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <div className="container mt-5 " style={{ maxWidth: "40rem" }}>
      <div className="text-center">
        <img src={logo} alt="Logo" className="logo mb-4" />
        <h2 className="mb-4">Create Your Account and Dive In! 💡</h2>
      </div>
      <div className="card p-4">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="username">Username:</label>
              <InputText
                id="username"
                name="username"
                type="email"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-field">
              <label htmlFor="password">Password:</label>
              <InputText
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.passwordRequirements ? "p-invalid" : ""}
              />
              {errors.passwordRequirements && (
                <small className="p-error">
                  Password must include at least one symbol, one number, and one uppercase letter.
                </small>
              )}
            </div>
            {formData.password && (
              <div className="p-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <InputText
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.passwordMismatch ? "p-invalid" : ""}
                />
                {errors.passwordMismatch && (
                  <small className="p-error">Passwords do not match.</small>
                )}
              </div>
            )}
            <div className="p-field-checkbox d-flex align-items-center mt-3">
              <Checkbox
                inputId="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms" className="mx-2">
                I agree to the <Link to="/terms">terms of service</Link>
              </label>
            </div>
            {errors.termsNotAccepted && (
              <small className="p-error">You must accept the terms of service.</small>
            )}
            <Button type="submit" label="Register" className="mt-3" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
