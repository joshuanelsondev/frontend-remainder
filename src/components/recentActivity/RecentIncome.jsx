import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { useModal } from "../../context/ModalContext";
import { formatAmount } from "../../utils/formatAmount";
import icons from "../../utils/icons";
import capitalizeStr from "../../utils/capitalizeStr";
import "./RecentIncome.scss";
import { formatToShort } from "../../utils/formatDate";

export default function RecentIncome() {
  const { userData } = useUserData();
  const { setActiveModal } = useModal();
  const incomes = userData?.incomeData?.incomes || [];

  return (
    <>
      {incomes && incomes.length ? (
        <div className="income-list">
          {incomes.map((income) => {
            const { dollars, cents } = formatAmount(income.amount);
            const Icon = icons[income.source];
            return (
              <div key={income.id} className="income-item">
                <div className="income-item__left">
                  {Icon && (
                    <Link to={"/income"} className="income-item__icon">
                      <Icon size={15} />
                    </Link>
                  )}
                  <div className="income-item__right">
                    <p className="income-item__source">
                      {capitalizeStr(income.source)}
                    </p>
                    <p className="income-item__amount">
                      ${dollars}.{cents}
                    </p>
                  </div>
                </div>
                <div className="income-item__date-container">
                  <p className="income-item__date-heading">Date</p>
                  <p className="income-item__date">
                    {formatToShort(income.date)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-data">
          <p>No Data Available Yet</p>
          <p
            onClick={() => setActiveModal("income")}
            className="no-data__add-income"
          >
            Add Income
          </p>
        </div>
      )}
    </>
  );
}
