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
  const { userData, availableYears, selectedYear, setSelectedYear } =
    useUserData();
  const { comparisons } = userData;
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Set the total pages and the current page
  useEffect(() => {
    if (comparisons && Object.keys(comparisons).length > 0) {
      const numberOfPages = Math.ceil(
        Object.keys(comparisons).length / itemsPerPage
      );
      setCurrentPage(numberOfPages - 1);
      setTotalPages(numberOfPages);
    }
  }, [comparisons, itemsPerPage]);

  if (!comparisons || Object.keys(comparisons).length === 0) {
    return <div>Loading comparisons...</div>;
  }

  // Convert month date (e.g., '2024-01') to month name
  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

  const months = Object.keys(comparisons).map((date) => {
    const [year, month] = date.split("-");
    return `${monthFormatter.format(new Date(year, month - 1))} '${year.slice(
      -2
    )}`;
  });

  const incomeData = Object.keys(comparisons).map(
    (date) => comparisons[date]?.income || 0
  );
  const expenseData = Object.keys(comparisons).map(
    (date) => comparisons[date]?.expenses || 0
  );

  // Paginate data
  const startIndex =
    currentPage < totalPages - 1
      ? currentPage * itemsPerPage
      : incomeData.length - itemsPerPage;
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
        backgroundColor: "#E74C3C",
        borderColor: "#F44336",
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
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          useBorderRadius: true,
        },
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
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = Number(e.target.value);
    setItemsPerPage(selectedItemsPerPage);
  };

  return (
    <div className="dashboard__comparison">
      <div className="heading">
        <h4 className="header">Monthly Income vs. Expenses</h4>
        <div className="comparisons-filters">
          <div className="year-selector">
            <label className="year-label" htmlFor="year">
              Select Start Year:
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="items-per-page-selector">
            <label className="items-per-page-label" htmlFor="itemsPerPage">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {[...Array(12)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
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
