import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../modals/ModalContext";
import "./Nav.scss";

export default function Nav() {
  const { setActiveModal } = useModal();

  return (
    <nav className="nav">
      <Link to={"/"} className="nav__header">
        Remainder
      </Link>
      <ul className="center-links">
        <li>
          <Link className="center-links__link" to={"/"}>
            Home
          </Link>
        </li>
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
          <Link className="center-links__link" to={"/contact"}>
            Contact
          </Link>
        </li>
      </ul>
      <div className="right-links">
        <button
          onClick={() => setActiveModal("login")}
          className="right-links__login"
        >
          Login
        </button>
        <button
          onClick={() => setActiveModal("signup")}
          className="right-links__signup"
        >
          Sign up
        </button>
      </div>
    </nav>
  );
}
