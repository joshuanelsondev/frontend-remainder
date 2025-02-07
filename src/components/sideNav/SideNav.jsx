import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import "./SideNav.scss";
import { SideNavLinks } from "./SideNavLinks.js";
import { FaSignOutAlt } from "react-icons/fa";

export default function SideNav() {
  const { setActiveModal } = useModal();

  return (
    <nav className="sidenav">
      <Link to={"/dashboard"} className="sidenav__logo">
        Remainder
      </Link>
      <ul className="sidenav-links">
        {SideNavLinks.map((link, index) => {
          return (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive ? "sidenav-link__active" : "sidenav-link"
              }
              to={link.path}
            >
              <link.icon
                className={({ isActive }) =>
                  isActive ? "sidenav-link__icon-active" : "sidenav-link__icon"
                }
              />
              {link.name}
            </NavLink>
          );
        })}
      </ul>
      <button
        className="sidenav-logout"
        onClick={() => setActiveModal("logout")}
      >
        <FaSignOutAlt className="sidenav-logout__icon" />
        Logout
      </button>
    </nav>
  );
}
