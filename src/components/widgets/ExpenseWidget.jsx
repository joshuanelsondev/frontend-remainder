import React, { useState } from "react";
import "./ExpenseWidget";
import {
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaExchangeAlt,
  FaShapes,
} from "react-icons/fa";

export default function ExpenseWidget() {
  const [increase, setIncrease] = useState(false);

  return (
    <div className="dashboard__expense">
      <h4 className="header">Expenses</h4>
      <p className="amount">
        $10,000<span className="cents">.00</span>
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
            10 transactions
          </p>
          <p className="categories">
            <span>
              <FaShapes className="icon" />
            </span>
            5 categories
          </p>
        </div>
      </div>
    </div>
  );
}
