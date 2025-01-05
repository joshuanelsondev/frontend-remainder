import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { formatAmount } from "../../utils/formatAmount";
import icons from "../../utils/icons";
import "./BreakdownWidget.scss";

export default function BreakdownWidget() {
  const { userData } = useUserData();
  const { expenses } = userData;

  return (
    <div className="dashboard__breakdown">
      <Link to={"/expense"} className="header">
        Expenses Breakdown
      </Link>
      <div className="expenses-list">
        {expenses.map((expense) => {
          const { dollars, cents } = formatAmount(expense.amount);
          const Icon = icons[expense.category];
          return (
            <div key={expense.id} className="expense-item">
              {Icon && <Icon className="expense-item__icon" />}
              <p className="expense-item__category">{expense.category}</p>
              <p className="expense-item__amount">
                ${dollars}.{cents}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
