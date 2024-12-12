import {
  FaRegChartBar,
  FaMoneyBill,
  FaChartPie,
  FaCog,
  FaPiggyBank,
} from "react-icons/fa";

export const SideNavLinks = [
  {
    name: "Dashboard",
    icon: FaRegChartBar,
    path: "/dashboard",
  },
  {
    name: "Income",
    icon: FaMoneyBill,
    path: "/incomes",
  },
  {
    name: "Expenses",
    icon: FaMoneyBill,
    path: "/expenses",
  },
  {
    name: "Budget",
    icon: FaChartPie,
    path: "./budget",
  },
  {
    name: "Investments",
    icon: FaPiggyBank,
    path: "/investments",
  },
  {
    name: "Settings",
    icon: FaCog,
    path: "/settings",
  },
];
