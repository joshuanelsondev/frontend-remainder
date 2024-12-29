import React from "react";
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
import "./ComparisonWidget";

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
  const { incomes, expenses } = userData;
  console.log("User Data:", userData);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Comparison",
        data: [incomes, expenses],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income vs. Expenses Comparison",
      },
    },
  };

  return (
    <div className="dashboard__comparison">
      <h4 className="header">Comparisons</h4>
      <Bar data={data} options={options} />
    </div>
  );
}
