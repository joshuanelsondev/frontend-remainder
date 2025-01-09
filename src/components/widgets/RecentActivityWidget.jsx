import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { formatAmount } from "../../utils/formatAmount";
import icons from "../../utils/icons";
import capitalizeStr from "../../utils/capitalizeStr";
import RecentIncome from "../../components/recentActivity/RecentIncome";
import RecentExpense from "../../components/recentActivity/RecentExpense";
import "./RecentActivityWidget.scss";

export default function RecentActivityWidget() {
  const [activityData, setActivityData] = useState("income");

  return (
    <div className="dashboard__recent-activity">
      <div className="recent-activity-heading">
        <p className="header">Recent Activity</p>
        <div className="recent-activity-btns">
          <p
            className={`recent-activity-btn${
              activityData === "income" ? "-active" : ""
            }`}
            onClick={() => setActivityData("income")}
          >
            Income
          </p>
          <p
            className={`recent-activity-btn${
              activityData === "expense" ? "-active" : ""
            }`}
            onClick={() => setActivityData("expense")}
          >
            Expense
          </p>
        </div>
      </div>
      {activityData === "income" && <RecentIncome />}
      {activityData === "expense" && <RecentExpense />}
    </div>
  );
}
