import React from "react";
import { useState } from "react";
import LoginModal from "../../modals/login/LoginModal";
import SignupModal from "../../modals/signup/SignupModal";
import "./LandingPage.scss";

export default function LandingPage() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  return (
    <div className="landing-page">
      <section className="hero">
        <h1 className="hero__headline">See gains with what remains</h1>
        <h3 className="hero__subheadline">
          Master your budget and turn savings into smart investments.
        </h3>
        <button className="hero__cta">Get Started</button>
      </section>
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}
      {signupModal && <SignupModal setSignupModal={setSignupModal} />}
    </div>
  );
}
