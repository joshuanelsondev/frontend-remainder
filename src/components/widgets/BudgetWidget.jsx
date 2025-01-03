import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BudgetWidget.scss";
import { useUserData } from "../../context/UserDataContext";
import { formatAmount } from "../../utils/formatAmount";
import {
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaExchangeAlt,
  FaThLarge,
} from "react-icons/fa";

export default function BudgetWidget() {
  const [increase, setIncrease] = useState(true);
  const { userData } = useUserData();
  const {
    budget = 0,
    totalSources = 0,
    totalTransactions = 0,
  } = userData.budget || {};
  const { dollars, cents } = formatAmount(budget);

  return (
    <div className="dashboard__budget">
      <Link to={"/budget"} className="header">
        Budget
      </Link>
      <p className="amount">
        ${dollars}
        <span className="cents">.{cents}</span>
      </p>
      <div className="bottom">
        <div className="left-subinfo">
          <p className={`percentage ${increase ? "increase" : "decrease"}`}>
            {increase ? <FaAngleDoubleUp size={16} /> : <FaAngleDoubleDown />}
            10%
          </p>
          <p className="text">
            You have <span className="text-amt">$1,000</span> more compared to
            last month
          </p>
        </div>
        <div className="right-subinfo">
          <p className="transactions">
            <FaExchangeAlt className="icon" />
            {totalTransactions} transactions
          </p>
          <p className="categories">
            <span>
              <FaThLarge className="icon" />
            </span>
            {totalSources} categories
          </p>
        </div>
      </div>
    </div>
  );
}
