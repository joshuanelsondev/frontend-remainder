import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { useModal } from "../../context/ModalContext";
import { formatAmount } from "../../utils/formatAmount";
import { formatToShort } from "../../utils/formatDate";
import icons from "../../utils/icons";
import capitalizeStr from "../../utils/capitalizeStr";
import "./RecentExpense.scss";

export default function RecentExpense() {
  const { userData } = useUserData();
  const { setActiveModal } = useModal();
  const expenses = userData?.expenseData?.expenses || [];

  return (
    <>
      {expenses.length ? (
        <div className="expenses-list">
          {expenses.map((expense) => {
            const { dollars, cents } = formatAmount(expense.amount);
            const Icon = icons[expense.category];
            return (
              <div key={expense.id} className="expense-item">
                <div className="expense-item__left">
                  {Icon && (
                    <Link to={"/expense"} className="expense-item__icon">
                      <Icon size={15} />
                    </Link>
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
                <div className="expense-item__date-container">
                  <p className="expense-item__date-heading">Date</p>
                  <p className="expense-item__date">
                    {formatToShort(expense.date)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-data">
          <p>No Data Available Yet</p>
          <p
            onClick={() => setActiveModal("expense")}
            className="no-data__add-expense"
          >
            Add Expense
          </p>
        </div>
      )}
    </>
  );
}
