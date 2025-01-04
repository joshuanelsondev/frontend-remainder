import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ExpenseWidget";
import { useUserData } from "../../context/UserDataContext";
import { useModal } from "../../context/ModalContext";
import { formatAmount } from "../../utils/formatAmount";
import {
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaExchangeAlt,
  FaThLarge,
  FaRegPlusSquare,
} from "react-icons/fa";

export default function ExpenseWidget() {
  const [increase, setIncrease] = useState(false);
  const { userData } = useUserData();
  const { setActiveModal } = useModal();
  const {
    totalExpenses = 0,
    expenseSources = 0,
    expenseTransactions = 0,
  } = userData.budget || {};
  const { dollars, cents } = formatAmount(totalExpenses);

  return (
    <div className="dashboard__expense">
      <div className="heading">
        <Link to={"/expense"} className="header">
          Expenses
        </Link>
        <FaRegPlusSquare
          className="add"
          onClick={() => setActiveModal("expense")}
          title="Add Expense"
        />
      </div>
      <p className="amount">
        ${dollars}
        <span className="cents">.{cents}</span>
      </p>
      <div className="bottom">
        <div className="left-subinfo">
          <p className={`percentage ${increase ? "increase" : "decrease"}`}>
            {increase ? (
              <FaAngleDoubleUp className="increase" size={16} />
            ) : (
              <FaAngleDoubleDown className="decrease" size={16} />
            )}
            10%
          </p>
          <p className="text">
            You spent <span className="text-amt">$500</span> more compared to
            last month
          </p>
        </div>
        <div className="right-subinfo">
          <p className="transactions">
            <FaExchangeAlt className="icon" />
            {expenseTransactions} transactions
          </p>
          <p className="categories">
            <span>
              <FaThLarge className="icon" />
            </span>
            {expenseSources} categories
          </p>
        </div>
      </div>
    </div>
  );
}
