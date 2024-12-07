import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "../../api/axios";
import useClickOutside from "../../hooks/useClickOutside";
import { AuthContext } from "../../context/AuthContext";
import "./LoginModal.scss";

export default function LoginModal({ setActiveModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const formRef = useRef(null);
  useClickOutside(formRef, () => setActiveModal(null));

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token } = response.data;
      login(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login">
      <div className="login__overlay"></div>
      <form ref={formRef} className="login__form" onSubmit={handleLogin}>
        <h2 className="login__header">Login</h2>
        <div className="login__email">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => setActiveModal("resetPassword")}
            className="login__resetPassword"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => setActiveModal("signup")}
            className="login__signup"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}

LoginModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
