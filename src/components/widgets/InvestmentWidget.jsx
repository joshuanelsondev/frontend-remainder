import React from "react";
import { Link } from "react-router-dom";
import "./InvestmentWidget.scss";

export default function InvestmentWidget() {
  return (
    <div className="dashboard__investment">
      <Link to={"/investment"} className="header">
        Investments
      </Link>
      <p className="no-data">No Data Available Yet</p>
    </div>
  );
}
