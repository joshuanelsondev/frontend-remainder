import React, { useContext } from "react";
import { useLocation } from "react-router";
import "./Header.scss";
import { FaUserCircle, FaSortDown } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import capitalizeStr from "../../utils/capitalizeStr";

const routes = {
  "/": "Dashboard",
  "/income": "Income",
  "/expense": "Expenses",
  "/budget": "Budget",
  "/investment": "Investments",
  "/settings": "Settings",
};

export default function Header() {
  const location = useLocation();
  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <div className="header">
      <h4 className="header__page">{routes[location.pathname]}</h4>
      <div className="header-right">
        <FaUserCircle size={24} />
        {isLoggedIn && user ? (
          <div className="header-right__user">
            <p className="header-right__name">
              {capitalizeStr(`${user.firstName} ${user.lastName}`)}
            </p>
            <p className="header-right__email">{user.email}</p>
          </div>
        ) : (
          <div className="header-right__user">
            <p className="header-right__name">Guest</p>
            <p className="header-right__email">guest@mail.com</p>
          </div>
        )}
        <FaSortDown className="header-right__caret" />
      </div>
    </div>
  );
}
