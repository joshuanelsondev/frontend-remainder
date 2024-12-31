import React from "react";
import { Link } from "react-router-dom";
import "./BreakdownWidget.scss";

export default function BreakdownWidget() {
  return (
    <div className="dashboard__breakdown">
      <Link to={"/expense"} className="header">
        Expenses Breakdown
      </Link>
    </div>
  );
}
