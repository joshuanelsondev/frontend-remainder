import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { AuthContext } from "../../context/AuthContext";
import "./LandingPage.scss";

export default function LandingPage() {
  const { setActiveModal } = useModal();
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setActiveModal("login");
    }
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <h1 className="hero__headline">See gains with what remains</h1>
        <h3 className="hero__subheadline">
          Master your budget and turn savings into smart investments.
        </h3>
        <button onClick={handleClick} className="hero__cta">
          Get Started
        </button>
      </section>
    </div>
  );
}
