import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { formatAmount } from "../../utils/formatAmount";
import icons from "../../utils/icons";
import capitalizeStr from "../../utils/capitalizeStr";
import "./BreakdownWidget.scss";

export default function BreakdownWidget() {
  const { userData } = useUserData();
  const { expenses } = userData;

  const expensesListClass =
    expenses.length <= 4 ? "expenses-list no-scroll" : "expenses-list";

  return (
    <div className="dashboard__breakdown">
      <Link to={"/expense"} className="header">
        Expenses Breakdown
      </Link>
      {expenses.length ? (
        <div className={expensesListClass}>
          {expenses.map((expense) => {
            const { dollars, cents } = formatAmount(expense.amount);
            const Icon = icons[expense.category];
            return (
              <div key={expense.id} className="expense-item">
                {Icon && (
                  <div className="expense-item__icon">
                    <Icon size={20} />
                  </div>
                )}
                <div className="expense-item__right">
                  <p className="expense-item__category">
                    {capitalizeStr(expense.category)}
                  </p>
                  <p className="expense-item__amount">
                    ${dollars}.{cents}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-data">No Data Available Yet</p>
      )}
    </div>
  );
}
