import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import "./BreakdownWidget.scss";

export default function BreakdownWidget() {
  const { userData } = useUserData();
  const { expenses } = userData;

  return (
    <div className="dashboard__breakdown">
      <Link to={"/expense"} className="header">
        Expenses Breakdown
      </Link>
    </div>
  );
}
