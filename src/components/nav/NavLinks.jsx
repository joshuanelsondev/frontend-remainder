import React from "react";

export default function NavLinks() {
  return (
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
  );
}
