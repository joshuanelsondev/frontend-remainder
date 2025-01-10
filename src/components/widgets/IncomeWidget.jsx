import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IncomeWidget.scss";
import { useUserData } from "../../context/UserDataContext";
import { formatAmount } from "../../utils/formatAmount";
import { useModal } from "../../context/ModalContext";
import { FaExchangeAlt, FaThLarge, FaPlus } from "react-icons/fa";

export default function IncomeWidget() {
  const [increase, setIncrease] = useState(true);
  const { userData } = useUserData();
  const { setActiveModal } = useModal();
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
        {/*Add income button  */}
        <button
          onClick={() => setActiveModal("income")}
          className="add"
          title="Add Income"
        >
          <FaPlus />
          Add Income
        </button>
      </div>
      <p className="amount">
        ${dollars}
        <span className="cents">.{cents}</span>
      </p>
      <div className="subinfo">
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
  );
}
