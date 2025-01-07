import React, { useState } from "react";
import "./Settings.scss";

const navLinks = [
  {
    displayName: "User",
    identifier: "user",
  },
  {
    displayName: "Password",
    identifier: "password",
  },
  {
    displayName: "Notifications",
    identifier: "notification",
  },
  {
    displayName: "Additional Settings",
    identifier: "additional",
  },
];

export default function Settings() {
  const [activeLink, setActiveLink] = useState("user");

  return (
    <div className="settings">
      <ul className="settings__nav">
        {navLinks.map((link, i) => (
          <li
            key={i}
            onClick={() => setActiveLink(link.identifier)}
            className={`settings__nav-link${
              activeLink === link.identifier ? "-active" : ""
            }`}
          >
            {link.displayName}
          </li>
        ))}
      </ul>
      <div className="settings__forms"></div>
    </div>
  );
}
