import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./SideNav.scss";
import {
  FaHome,
  FaUser,
  FaMoneyBill,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaPiggyBank,
} from "react-icons/fa";

export default function SideNav() {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="sidenav">
      <Link to={"/dashboard"} className="sidenav__logo">
        Remainder
      </Link>
      <ul className="sidenav-links">
        <Link className="sidenav-link" to={"/dashboard"}>
          <li className="sidenav-link">
            <FaHome className="sidenav-link__icon" />
            Dashboard
          </li>
        </Link>
        <Link className="sidenav-link" to={"/profile"}>
          <li className="sidenav-link">
            <FaUser className="sidenav-link__icon" />
            Profile
          </li>
        </Link>
        <Link className="sidenav-link" to={"/incomes"}>
          <li className="sidenav-link">
            <FaMoneyBill className="sidenav-link__icon" />
            Incomes
          </li>
        </Link>
        <Link className="sidenav-link" to={"/expenses"}>
          <li className="sidenav-link">
            <FaMoneyBill className="sidenav-link__icon" />
            Expenses
          </li>
        </Link>
        <Link className="sidenav-link" to={"/budget"}>
          <li className="sidenav-link">
            <FaChartPie className="sidenav-link__icon" />
            Budget
          </li>
        </Link>
        <Link className="sidenav-link" to={"/investments"}>
          <li className="sidenav-link">
            <FaPiggyBank className="sidenav-link__icon" />
            Investments
          </li>
        </Link>
        <Link className="sidenav-link" to={"/settings"}>
          <li className="sidenav-link">
            <FaCog className="sidenav-link__icon" />
            Settings
          </li>
        </Link>
      </ul>
      <button className="sidenav-logout" onClick={logout}>
        <FaSignOutAlt className="sidenav-logout__icon" />
        Logout
      </button>
    </nav>
  );
}
