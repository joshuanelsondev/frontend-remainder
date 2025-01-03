import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IncomeWidget.scss";
import { useUserData } from "../../context/UserDataContext";
import { formatAmount } from "../../utils/formatAmount";
import {
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaExchangeAlt,
  FaThLarge,
  FaRegPlusSquare,
} from "react-icons/fa";

export default function IncomeWidget() {
  const [increase, setIncrease] = useState(true);
  const { userData } = useUserData();
  const {
    totalIncome = 0,
    incomeSources = 0,
    incomeTransactions = 0,
  } = userData.budget || {};
  const { dollars, cents } = formatAmount(totalIncome);

  return (
    <div className="dashboard__income">
      <div className="heading">
        <Link to={"/income"} className="header">
          Income
        </Link>
        <FaRegPlusSquare className="add" />
      </div>
      <p className="amount">
        ${dollars}
        <span className="cents">.{cents}</span>
      </p>
      <div className="bottom">
        <div className="left-subinfo">
          <p className={`percentage ${increase ? "increase" : "decrease"}`}>
            {increase ? <FaAngleDoubleUp size={16} /> : <FaAngleDoubleDown />}
            5%
          </p>
          <p className="text">
            You earned <span className="text-amt">$300</span> more compared to
            last month
          </p>
        </div>
        <div className="right-subinfo">
          <p className="transactions">
            <FaExchangeAlt className="icon" />
            {incomeTransactions} transactions
          </p>
          <p className="categories">
            <span>
              <FaThLarge className="icon" />
            </span>
            {incomeSources} categories
          </p>
        </div>
      </div>
    </div>
  );
}
