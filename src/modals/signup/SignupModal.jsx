import React from "react";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import axios from "../../api/axios";
import "./SignupModal.scss";
import useClickOutside from "../../hooks/useClickOutside";
import validateInput from "../../utils/validateInput";
export default function SignupModal({ setActiveModal }) {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verifyMessage, setVerifyMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [dbError, setDbError] = useState(null);

  useClickOutside(formRef, () => setActiveModal(null));

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { confirmPassword, ...apiData } = formState;

    const allErrors = {};

    Object.keys(formState).forEach((fieldName) => {
      const fieldErrors = validateInput(fieldName, formState[fieldName]);
      Object.assign(allErrors, fieldErrors);
    });

    if (formState.password !== confirmPassword) {
      allErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      await axios.post("/auth/signup", apiData);
      setVerifyMessage(`Verification email sent to ${formState.email}`);
    } catch (error) {
      setDbError(error.response?.data?.message || "Something went wrong");
      setErrors({});
    }
    console.log(formState);
  };

  return (
    <div className="signup">
      <div className="signup__overlay"></div>
      <form
        ref={formRef}
        className="signup-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="signup-form__header">Sign up</h1>
        <div className="signup-form__first-name">
          <input
            id="first-name"
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleFormChange}
            placeholder=""
            required
          />
          <label htmlFor="first-name">First Name</label>
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="signup-form__last-name">
          <input
            id="last-name"
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleFormChange}
            placeholder=""
            required
          />
          <label htmlFor="last-name">Last Name</label>
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="signup-form__email">
          <input
            id="email"
            type="text"
            name="email"
            value={formState.email}
            onChange={handleFormChange}
            placeholder=""
            required
          />
          <label htmlFor="email">Email</label>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="signup-form__create-pwd">
          <input
            id="create-pwd"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleFormChange}
            placeholder=""
            required
          />
          <label htmlFor="create-pwd">Create Password</label>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="signup-form__re-type-pwd">
          <input
            id="re-type-pwd"
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleFormChange}
            placeholder=""
            required
          />
          <label htmlFor="re-type-pwd">Re-type Password</label>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <button className="signup-form__create-btn">Create account</button>
        <button
          onClick={() => setActiveModal("login")}
          className="signup-form__login"
        >
          Already have an account? Sign in
        </button>
        {dbError && <p className="db-error">{dbError}</p>}
        {verifyMessage && <p className="verify-message">{verifyMessage}</p>}
      </form>
    </div>
  );
}

SignupModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};