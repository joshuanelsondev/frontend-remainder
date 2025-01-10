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
      <div className="heading">
        <Link to={"/budget"} className="header">
          Budget
        </Link>
      </div>
      <p className="amount">
        ${dollars}
        <span className="cents">.{cents}</span>
      </p>
      <div className="subinfo">
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
  );
}
