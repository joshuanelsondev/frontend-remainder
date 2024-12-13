import React from "react";
import { useModal } from "../../context/ModalContext";
import "./LandingPage.scss";

export default function LandingPage() {
  const { setActiveModal } = useModal();

  return (
    <div className="landing-page">
      <section className="hero">
        <h1 className="hero__headline">See gains with what remains</h1>
        <h3 className="hero__subheadline">
          Master your budget and turn savings into smart investments with
          Remainder - track expenses, manage income, and grow your wealth.
        </h3>
        <button onClick={() => setActiveModal("login")} className="hero__cta">
          Get Started
        </button>
      </section>
    </div>
  );
}
