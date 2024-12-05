import React from "react";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import "./SignupModal.scss";
import useClickOutside from "../../hooks/useClickOutside";
export default function SignupModal({ setActiveModal }) {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  useClickOutside(formRef, () => setActiveModal(null));

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setError(null);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formState;
    console.log(email, password, confirmPassword);
  };

  const handleFormSubmissionErrors = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setError("This email address is already in use.");
        break;
      case "auth/invalid-email":
        setError("Please enter a valid email address.");
        break;
      case "auth/operation-not-allowed":
        setError("Email/password accounts are not enabled. Contact support.");
        break;
      case "auth/weak-password":
        setError(
          "Password must contain a lower case character, an upper case character, a non-alphanumeric character, and be at least 6 characters long."
        );
        break;
      case "auth/network-request-failed":
        setError("Network error. Please check your internet connection.");
        break;
      case "auth/too-many-requests":
        setError("Too many requests. Please try again later.");
        break;
      case "auth/internal-error":
        setError("An internal error occurred. Please try again.");
        break;
      default:
        setError("An unknown error occurred. Please try again.");
        break;
    }
  };

  return (
    <div className="create-account">
      <form ref={formRef} className="ca-form" onSubmit={handleSignUp}>
        <h1 className="ca-form__header">Sign up</h1>
        <div className="ca-form__first-name">
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
        </div>
        <div className="ca-form__last-name">
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
        </div>
        <div className="ca-form__email">
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
        </div>
        <div className="ca-form__create-pwd">
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
        </div>
        <div className="ca-form__re-type-pwd">
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
        </div>
        <button className="ca-form__create-btn">Create account</button>
        <button
          onClick={() => setActiveModal("login")}
          className="ca-form__sign-in"
        >
          Already have an account? Sign in
        </button>
        {error && (
          <div className="error-modal">
            <h2 className="error-modal__message">{error}</h2>
          </div>
        )}
      </form>
    </div>
  );
}

SignupModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
