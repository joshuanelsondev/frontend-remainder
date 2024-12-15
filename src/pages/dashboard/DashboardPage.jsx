import React from "react";
import BalanceWidget from "../../components/widgets/BalanceWidget";
import IncomeWidget from "../../components/widgets/IncomeWidget";
import ExpenseWidget from "../../components/widgets/ExpenseWidget";
import ComparisonWidget from "../../components/widgets/ComparisonWidget";
import InvestmentWidget from "../../components/widgets/InvestmentWidget";
import BreakdownWidget from "../../components/widgets/BreakdownWidget";
import "./DashboardPage.scss";

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <BalanceWidget />
      <IncomeWidget />
      <ExpenseWidget />
      <ComparisonWidget />
      <InvestmentWidget />
      <BreakdownWidget />
    </div>
  );
}
