import React, { useState } from "react";
import UserSettings from "./user/UserSettings";
import PasswordSettings from "./password/PasswordSettings";
import NotificationSettings from "./notifications/NotificationSettings";
import AdditionalSettings from "./additional/AdditionalSettings";
import "./Settings.scss";

const navLinks = [
  {
    displayName: "User Settings",
    identifier: "user",
  },
  // {
  //   displayName: "Password Settings",
  //   identifier: "password",
  // },
  // {
  //   displayName: "Notifications",
  //   identifier: "notification",
  // },
  // {
  //   displayName: "Additional Settings",
  //   identifier: "additional",
  // },
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
      <div className="settings__forms">
        {activeLink === "user" && <UserSettings />}
        {activeLink === "password" && <PasswordSettings />}
        {activeLink === "notification" && <NotificationSettings />}
        {activeLink === "additional" && <AdditionalSettings />}
      </div>
    </div>
  );
}
