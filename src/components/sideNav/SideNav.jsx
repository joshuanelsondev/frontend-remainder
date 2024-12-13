import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./SideNav.scss";
import { SideNavLinks } from "./SideNavLinks.js";
import { FaSignOutAlt } from "react-icons/fa";

export default function SideNav() {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="sidenav">
      <Link to={"/dashboard"} className="sidenav__logo">
        Remainder
      </Link>
      <ul className="sidenav-links">
        {SideNavLinks.map((link, index) => {
          return (
            <Link key={index} className="sidenav-link" to={link.path}>
              <link.icon className="sidenav-link__icon" />
              {link.name}
            </Link>
          );
        })}
      </ul>
      <button className="sidenav-logout" onClick={logout}>
        <FaSignOutAlt className="sidenav-logout__icon" />
        Logout
      </button>
    </nav>
  );
}
