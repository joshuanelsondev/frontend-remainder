import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to={"/"} className="nav__header">
        Remainder
      </Link>
      <ul className="center-links">
        <li>
          <Link className="center-links__link" to={"/about"}>
            About
          </Link>
        </li>
        <li>
          <Link className="center-links__link" to={"/features"}>
            Features
          </Link>
        </li>
        <li>
          <Link className="center-links__link" to={"/plansAndPricing"}>
            Plans & Pricing
          </Link>
        </li>
        <li>
          <Link className="center-links__link" to={"/contact"}>
            Contact
          </Link>
        </li>
      </ul>
      <div className="right-links">
        <button className="right-links__login">Login</button>
        <button className="right-links__signup">Sign up</button>
      </div>
    </nav>
  );
}
