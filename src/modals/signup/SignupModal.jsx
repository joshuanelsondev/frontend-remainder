import React from "react";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import validateInput from "../../utils/validateInput";
import { signupUser } from "../../api/auth";
import { FaRegEyeSlash, FaRegEye, FaInfoCircle } from "react-icons/fa";
import "./SignupModal.scss";

export default function SignupModal({ setActiveModal }) {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const [confirmPwdVisibility, setConfirmPwdVisibility] = useState(false);
  const [pwdInfo, setPwdInfo] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useClickOutside(formRef, () => {
    setActiveModal(null);
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setMessage(null);
    setErrors({});
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
      setMessage("Submitting your information...");
      await signupUser(apiData);
      setMessage(
        "Your account is being set up. Check your email for the next steps."
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      setErrors({});
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
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
            className={errors.firstName ? "signup-form__input-error" : ""}
            required
          />
          <label htmlFor="first-name">First Name</label>
          {errors.firstName && (
            <p className="signup-form__error">{errors.firstName}</p>
          )}
        </div>
        <div className="signup-form__last-name">
          <input
            id="last-name"
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleFormChange}
            className={errors.lastName ? "signup-form__input-error" : ""}
            placeholder=""
            required
          />
          <label htmlFor="last-name">Last Name</label>
          {errors.lastName && (
            <p className="signup-form__error">{errors.lastName}</p>
          )}
        </div>
        <div className="signup-form__email">
          <input
            id="email"
            type="text"
            name="email"
            value={formState.email}
            onChange={handleFormChange}
            className={errors.email ? "signup-form__input-error" : ""}
            placeholder=""
            required
          />
          <label htmlFor="email">Email</label>
          {errors.email && <p className="signup-form__error">{errors.email}</p>}
        </div>
        <div className="signup-form__create-pwd">
          <input
            id="create-pwd"
            type={`${pwdVisibility ? "text" : "password"}`}
            name="password"
            value={formState.password}
            onChange={handleFormChange}
            className={errors.password ? "signup-form__input-error" : ""}
            placeholder=""
            required
          />
          <label htmlFor="create-pwd">Create Password</label>
          {!pwdVisibility ? (
            <FaRegEyeSlash
              onClick={() => setPwdVisibility(!pwdVisibility)}
              className="signup-form__pwd-visibility"
            />
          ) : (
            <FaRegEye
              onClick={() => setPwdVisibility(!pwdVisibility)}
              className="signup-form__pwd-visibility"
            />
          )}
          <div className="signup-form__pwd-info-icon">
            <FaInfoCircle
              onClick={() => setPwdInfo(!pwdInfo)}
              title="Password Requirements"
            />
            {pwdInfo && (
              <p className="signup-form__pwd-info-text">
                Password must be at least 10 characters long, include an
                uppercase letter, a lowercase letter, a number, and a special
                character.
              </p>
            )}
          </div>
          {errors.password && (
            <p className="signup-form__error">{errors.password}</p>
          )}
        </div>
        <div className="signup-form__re-type-pwd">
          <input
            id="re-type-pwd"
            type={`${confirmPwdVisibility ? "text" : "password"}`}
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleFormChange}
            className={errors.confirmPassword ? "signup-form__input-error" : ""}
            placeholder=""
            required
          />
          <label htmlFor="re-type-pwd">Re-type Password</label>
          {!confirmPwdVisibility ? (
            <FaRegEyeSlash
              onClick={() => setConfirmPwdVisibility(!confirmPwdVisibility)}
              className="signup-form__pwd-visibility"
            />
          ) : (
            <FaRegEye
              onClick={() => setConfirmPwdVisibility(!confirmPwdVisibility)}
              className="signup-form__pwd-visibility"
            />
          )}
          {errors.confirmPassword && (
            <p className="signup-form__error">{errors.confirmPassword}</p>
          )}
        </div>
        <button className="signup-form__create-btn">Create account</button>
        <div>
          <button
            type="submit"
            onClick={() => setActiveModal("login")}
            className="signup-form__login"
          >
            Already have an account? Sign in
          </button>
          {message && <p className="signup-form__message">{message}</p>}
        </div>
      </form>
    </div>
  );
}

SignupModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
