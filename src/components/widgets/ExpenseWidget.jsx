import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ExpenseWidget";
import { useUserData } from "../../context/UserDataContext";
import { formatAmount } from "../../utils/formatAmount";
import {
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaExchangeAlt,
  FaShapes,
} from "react-icons/fa";

export default function ExpenseWidget() {
  const [increase, setIncrease] = useState(false);
  const { userData } = useUserData();
  const {
    totalExpenses = 0,
    expenseSources = 0,
    expenseTransactions = 0,
  } = userData.budget || {};
  const { dollars, cents } = formatAmount(totalExpenses);

  return (
    <div className="dashboard__expense">
      <Link to={"/expenses"} className="header">
        Expenses
      </Link>
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
              <FaShapes className="icon" />
            </span>
            {expenseSources} categories
          </p>
        </div>
      </div>
    </div>
  );
}
