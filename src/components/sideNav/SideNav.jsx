import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function SideNav() {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="sidenav">
      <h4 className="sidenav__logo">Remainder</h4>
      <ul className="sidenav-links">
        <li className="sidenav-links__link">
          <Link to={"/dashboard"}>Home</Link>
        </li>
        <li className="sidenav-links__link">
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li className="sidenav-links__link">
          <Link to={"/incomes"}>Incomes</Link>
        </li>
        <li className="sidenav-links__link">
          <Link to={"/expenses"}>Expenses</Link>
        </li>
        <li className="sidenav-links__link">
          <Link to={"/budget"}>Budget</Link>
        </li>
        <li className="sidenav-links__link">
          <Link to={"/investments"}>Investments</Link>
        </li>
        <li className="sidenav-links__link">
          <Link to={"/settings"}>Settings</Link>
        </li>
      </ul>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
