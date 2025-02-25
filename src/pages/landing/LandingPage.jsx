import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { loginUser } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import "./LandingPage.scss";
const GuestEmail = import.meta.env.VITE_APP_GUEST_EMAIL;
const GuestPassword = import.meta.env.VITE_APP_GUEST_PASSWORD;

export default function LandingPage() {
  const { setActiveModal } = useModal();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      const response = await loginUser(GuestEmail, GuestPassword);

      const { token } = response;

      if (!token) {
        throw new Error("invalid response: token is missing.");
      }

      login(token);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <h1 className="hero__headline">See gains with what remains</h1>
        <h3 className="hero__subheadline">
          Master your budget and turn savings into smart investments with
          Remainder - track expenses, manage income, and grow your wealth.
        </h3>
        <div className="hero__btns">
          <button onClick={() => setActiveModal("login")} className="hero__cta">
            Get Started
          </button>
          <button
            onClick={handleGuestLogin}
            className="hero__cta"
            title="Sign in as a Guest"
          >
            Explore the App
          </button>
        </div>
      </section>
    </div>
  );
}
