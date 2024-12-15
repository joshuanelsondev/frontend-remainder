import React from "react";
import { useLocation } from "react-router";
import "./Header.scss";
import { FaUserCircle, FaSortDown } from "react-icons/fa";

const routes = {
  "/": "Dashboard",
  "/incomes": "Income",
  "/expenses": "Expenses",
  "/budget": "Budget",
  "/investments": "Investments",
  "/settings": "Settings",
};

export default function Header() {
  const location = useLocation();

  return (
    <div className="header">
      <h4 className="header__page">{routes[location.pathname]}</h4>
      <div className="header-right">
        <FaUserCircle size={24} />
        <div className="header-right__user">
          <p className="header-right__name">User Name</p>
          <p className="header-right__email">useremail@mail.com</p>
        </div>
        <FaSortDown />
      </div>
    </div>
  );
}
