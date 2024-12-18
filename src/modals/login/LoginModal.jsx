import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "../../api/axios";
import { authenticateUser } from "../../api/auth";
import useClickOutside from "../../hooks/useClickOutside";
import { AuthContext } from "../../context/AuthContext";
import "./LoginModal.scss";

export default function LoginModal({ setActiveModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successModal, setSuccessModal] = useState(null);
  const [useWebAuthn, setUseWebAuthn] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useClickOutside(formRef, () => setActiveModal(null));

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token } = response.data;

      if (!token) {
        throw new Error("invalid response: token is missing.");
      }

      login(token);
      setSuccessModal(true);
      setTimeout(() => {
        setActiveModal(null);
      }, 1200);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleWebAuthnLogin = async () => {
    try {
      const { token } = await authenticateUser(email);
      login(token);
      setSuccessModal(true);
      setTimeout(() => {
        setActiveModal(null);
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      console.error("Authentication failed:", error);
      setError(error.message || "Authentication failed. Please try again.");
    }
  };

  const handleFormInput = (e) => {
    const { id, value } = e.target;
    if (id == "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="login">
      <div className="login__overlay"></div>
      {/* <div className="login__webauthn">
        <p>Sign in with your passkey. Enter your email to proceed:</p>
        <input
          id="email"
          value={email}
          onChange={handleFormInput}
          placeholder="Enter your email"
          className="login__input"
          type="email"
          required
        />
        <button
          type="button"
          onClick={handleWebAuthnLogin}
          className="login__sign-in"
        >
          Sign in with Passkey
        </button>
      </div> */}
      {!successModal ? (
        <form ref={formRef} className="login__form" onSubmit={handleLogin}>
          <h2 className="login__header">Login</h2>
          <div className="login__email">
            <input
              id="email"
              value={email}
              onChange={(e) => handleFormInput(e)}
              placeholder=""
              className="login__input"
              type="email"
              required
            />
            <label className="login__label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="login__password">
            <input
              id="password"
              value={password}
              onChange={(e) => handleFormInput(e)}
              placeholder=""
              className="login__input"
              type="password"
              required
            />
            <label className="login__label" htmlFor="password">
              Password
            </label>
          </div>
          <button type="submit" className="login__sign-in">
            Sign in
          </button>
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
          {error && (
            <p className="login__error" aria-live="polite">
              {error}
            </p>
          )}
        </form>
      ) : (
        <div className="success">
          <p className="success__message">Successful Login</p>
        </div>
      )}
    </div>
  );
}

LoginModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
