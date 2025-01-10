import React from "react";
import BudgetWidget from "../../components/widgets/BudgetWidget";
import IncomeWidget from "../../components/widgets/IncomeWidget";
import ExpenseWidget from "../../components/widgets/ExpenseWidget";
import ComparisonWidget from "../../components/widgets/ComparisonWidget";
import InvestmentWidget from "../../components/widgets/InvestmentWidget";
import RecentActivityWidget from "../../components/widgets/RecentActivityWidget";
import "./DashboardPage.scss";

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <BudgetWidget />
      <IncomeWidget />
      <ExpenseWidget />
      <ComparisonWidget />
      {/* <InvestmentWidget /> */}
      <RecentActivityWidget />
    </div>
  );
}
