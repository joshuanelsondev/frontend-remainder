import React, { useState, useEffect } from "react";
import { useUserData } from "../../context/UserDataContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ComparisonWidget.scss";

// Register ChartJS components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function ComparisonWidget() {
  const { userData } = useUserData();
  const { comparisons } = userData;
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (comparisons && Object.keys(comparisons).length > 0) {
      const totalPages = Math.ceil(
        Object.keys(comparisons).length / itemsPerPage
      );
      setCurrentPage(totalPages - 1);
    }
  }, [comparisons, itemsPerPage]);

  if (!comparisons || Object.keys(comparisons).length === 0) {
    return <div>Loading comparisons...</div>;
  }

  // Convert month date (e.g., '2024-01') to month name
  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });

  const months = Object.keys(comparisons).map((date) => {
    const [year, month] = date.split("-");
    return monthFormatter.format(new Date(year, month - 1));
  });

  const incomeData = Object.keys(comparisons).map(
    (date) => comparisons[date]?.income || 0
  );
  const expenseData = Object.keys(comparisons).map(
    (date) => comparisons[date]?.expenses || 0
  );

  // Paginate data
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMonths = months.slice(startIndex, endIndex);
  const paginatedIncomeData = incomeData.slice(startIndex, endIndex);
  const paginatedExpenseData = expenseData.slice(startIndex, endIndex);

  const data = {
    labels: paginatedMonths,
    datasets: [
      {
        label: "Income",
        data: paginatedIncomeData,
        backgroundColor: "#049ada",
        borderColor: "#036a96",
        borderWidth: 1,
        borderRadius: 3,
      },
      {
        label: "Expenses",
        data: paginatedExpenseData,
        backgroundColor: "#9DE2FF",
        borderColor: "#0377A9",
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Monthly Income vs. Expenses",
      },
    },
    layout: {
      padding: {
        top: 10,
      },
    },
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    const totalPages = Math.ceil(months.length / itemsPerPage);
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="dashboard__comparison">
      <h4 className="header">Monthly Income vs. Expenses</h4>
      <div className="comparisons-chart">
        <Bar data={data} options={options} />
        <div className="pagination-buttons">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="pagination-buttons__prev"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={endIndex >= months.length}
            className="pagination-buttons__next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
