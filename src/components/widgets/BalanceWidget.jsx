import React, { useState } from "react";
import "./BalanceWidget.scss";
import {
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaExchangeAlt,
  FaShapes,
} from "react-icons/fa";

export default function BalanceWidget() {
  const [increase, setIncrease] = useState(true);

  return (
    <div className="dashboard__balance">
      <h4 className="header">Balance</h4>
      <p className="amount">
        $10,000<span className="cents">.00</span>
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
