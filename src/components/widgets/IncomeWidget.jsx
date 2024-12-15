import React, { useState } from "react";
import "./IncomeWidget.scss";
import {
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaExchangeAlt,
  FaShapes,
} from "react-icons/fa";

export default function IncomeWidget() {
  const [increase, setIncrease] = useState(true);

  return (
    <div className="dashboard__income">
      <h4 className="header">Income</h4>
      <p className="amount">
        $8,500<span className="cents">.00</span>
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
            30 transactions
          </p>
          <p className="categories">
            <span>
              <FaShapes className="icon" />
            </span>
            8 categories
          </p>
        </div>
      </div>
    </div>
  );
}
