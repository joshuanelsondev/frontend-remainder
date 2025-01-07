import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { formatAmount } from "../../utils/formatAmount";
import icons from "../../utils/icons";
import capitalizeStr from "../../utils/capitalizeStr";
import "./RecentIncome.scss";

export default function RecentIncome() {
  const { userData } = useUserData();
  const { incomes } = userData;

  const incomeListClass =
    incomes.length <= 4 ? "income-list no-scroll" : "income-list";

  return (
    <>
      {incomes.length ? (
        <div className={incomeListClass}>
          {incomes.map((income) => {
            const { dollars, cents } = formatAmount(income.amount);
            const Icon = icons[income.source];
            return (
              <div key={income.id} className="income-item">
                {Icon && (
                  <Link to={"/income"} className="income-item__icon">
                    <Icon size={15} />
                  </Link>
                )}
                <div className="income-item__right">
                  <p className="income-item__category">
                    {capitalizeStr(income.source)}
                  </p>
                  <p className="income-item__amount">
                    ${dollars}.{cents}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-data">No Data Available Yet</p>
      )}
    </>
  );
}
