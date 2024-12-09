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
        <li className="sidenav-link">
          <FaHome className="sidenav-link__icon" />
          <Link className="sidenav-link__link" to={"/dashboard"}>
            Home
          </Link>
        </li>
        <li className="sidenav-link">
          <FaUser className="sidenav-link__icon" />
          <Link className="sidenav-link__link" to={"/profile"}>
            Profile
          </Link>
        </li>
        <li className="sidenav-link">
          <FaMoneyBill className="sidenav-link__icon" />
          <Link className="sidenav-link__link" to={"/incomes"}>
            Incomes
          </Link>
        </li>
        <li className="sidenav-link">
          <FaMoneyBill className="sidenav-link__icon" />
          <Link className="sidenav-link__link" to={"/expenses"}>
            Expenses
          </Link>
        </li>
        <li className="sidenav-link">
          <FaChartPie className="sidenav-link__icon" />
          <Link className="sidenav-link__link" to={"/budget"}>
            Budget
          </Link>
        </li>
        <li className="sidenav-link">
          <FaPiggyBank className="sidenav-link__icon" />
          <Link className="sidenav-link__link" to={"/investments"}>
            Investments
          </Link>
        </li>
        <li className="sidenav-link">
          <FaCog className="sidenav-link__icon" />
          <Link className="sidenav-link__link" to={"/settings"}>
            Settings
          </Link>
        </li>
      </ul>
      <div className="sidenav-logout">
        <FaSignOutAlt className="sidenav-logout__icon" />
        <button className="sidenav-logout__link" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
