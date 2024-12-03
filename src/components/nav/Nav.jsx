import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

export default function Nav() {
  return (
    <div className="nav">
      <h1 className="nav__header">Remainder</h1>
      <div className="nav__links-center">
        <Link className="nav__link-btn" to={"./about"}>
          About
        </Link>
        <Link className="nav__link-btn" to={"./features"}>
          Features
        </Link>
        <Link className="nav__link-btn" to={"./plansAndPricing"}>
          Plans & Pricing
        </Link>
        <Link className="nav__link-btn" to={"./contact"}>
          Contact
        </Link>
      </div>
      <div className="nav__links-right">
        <button className="nav__login">Login</button>
        <button className="nav__signup">Sign up</button>
      </div>
    </div>
  );
}
