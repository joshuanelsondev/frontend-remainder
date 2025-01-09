import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import validateInput from "../../utils/validateInput";
import { loginUser } from "../../api/auth";
import { authenticateUser } from "../../api/auth";
import useClickOutside from "../../hooks/useClickOutside";
import { AuthContext } from "../../context/AuthContext";
import { FaRegEyeSlash, FaRegEye, FaInfoCircle } from "react-icons/fa";
import "./LoginModal.scss";

export default function LoginModal({ setActiveModal }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const [pwdInfo, setPwdInfo] = useState(false);
  const [useWebAuthn, setUseWebAuthn] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useClickOutside(formRef, () => setActiveModal(null));

  const handleFormErrors = (formFields) => {
    const allErrors = {};

    Object.keys(formFields).forEach((fieldName) => {
      const fieldErrors = validateInput(fieldName, form[fieldName]);
      Object.assign(allErrors, fieldErrors);
    });

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return false;
    }

    return true;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!handleFormErrors(form)) {
      return;
    }

    try {
      const { email, password } = form;
      const response = await loginUser(email, password);

      const { token } = response;

      if (!token) {
        throw new Error("invalid response: token is missing.");
      }

      login(token);
      setMessage("Successful Login");
      setTimeout(() => {
        setActiveModal(null);
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Login failed", error);
      setMessage(
        (error.response?.data?.message &&
          `${error.response?.data?.message}. Please try again.`) ||
          "Login failed. Please try again."
      );
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    }
  };

  const handleWebAuthnLogin = async () => {
    const { password, ...email } = form;

    if (!handleFormErrors(email)) {
      return;
    }

    try {
      const { token } = await authenticateUser(email);
      if (!token) {
        console.error("No token");
      }

      login(token);
      navigate("/");
    } catch (error) {
      console.error("Authentication failed:", error);
      setMessage(error.message || "Authentication failed. Please try again.");
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    }
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({});
    setMessage(null);
  };

  return (
    <div className="login">
      <div className="login__overlay"></div>
      <form
        ref={formRef}
        className="login__form"
        onSubmit={handleLogin}
        noValidate
      >
        {useWebAuthn ? (
          <>
            <h2 className="login__header">Enter Email</h2>
            <div className="login__email">
              <input
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => handleFormInput(e)}
                placeholder=""
                className="login__input"
                type="email"
                required
              />
              <label className="login__label" htmlFor="email">
                Email
              </label>
              {errors.email && <p className="login__error">{errors.email}</p>}
            </div>
            <div className="login__webauthn">
              <button
                onClick={handleWebAuthnLogin}
                type="button"
                className="login-options__sign-in"
              >
                Sign in
              </button>
              <p className="login-options__or">or</p>
              <button
                type="button"
                onClick={() => setUseWebAuthn(false)}
                className="login__back-to-login"
              >
                Sign in with password
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="login__header">Login</h2>
            <div className="login__email">
              <input
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => handleFormInput(e)}
                placeholder=""
                className="login__input"
                type="email"
                required
              />
              <label className="login__label" htmlFor="email">
                Email
              </label>
              {errors.email && <p className="login__error">{errors.email}</p>}
            </div>
            <div className="login__password">
              <input
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => handleFormInput(e)}
                placeholder=""
                className="login__input"
                type={`${pwdVisibility ? "text" : "password"}`}
                required
              />
              <label className="login__label" htmlFor="password">
                Password
              </label>
              {!pwdVisibility ? (
                <FaRegEyeSlash
                  onClick={() => setPwdVisibility(!pwdVisibility)}
                  className="login__pwd-visibility"
                />
              ) : (
                <FaRegEye
                  onClick={() => setPwdVisibility(!pwdVisibility)}
                  className="login__pwd-visibility"
                />
              )}
              <div className="login__pwd-info-icon">
                <FaInfoCircle
                  onClick={() => setPwdInfo(!pwdInfo)}
                  title="Password Requirements"
                />
                {pwdInfo && (
                  <p className="login__pwd-info-text">
                    Password must be at least 10 characters long, include an
                    uppercase letter, a lowercase letter, a number, and a
                    special character.
                  </p>
                )}
              </div>
              {errors.password && (
                <p className="login__error">{errors.password}</p>
              )}
            </div>

            {/*Login Options */}
            <div className="login-options">
              <button type="submit" className="login-options__sign-in">
                Sign in
              </button>
              <p className="login-options__or">or</p>
              <button
                type="button"
                onClick={() => setUseWebAuthn(true)}
                className="login-options__sign-in"
              >
                Sign in with Passkey
              </button>
            </div>
            <div className="login__links">
              <button
                type="button"
                onClick={() => setActiveModal("resetPassword")}
                className="login__resetPassword"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("signup")}
                className="login__signup"
              >
                Create account
              </button>
            </div>
          </>
        )}

        {message && (
          <p className="login__message" aria-live="polite">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

LoginModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
