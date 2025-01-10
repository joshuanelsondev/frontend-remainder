import {
  FaChartBar,
  FaMoneyCheck,
  FaMoneyBill,
  FaChartPie,
  FaCog,
  FaPiggyBank,
} from "react-icons/fa";

export const SideNavLinks = [
  {
    name: "Dashboard",
    icon: FaChartBar,
    path: "/",
  },
  {
    name: "Income",
    icon: FaMoneyBill,
    path: "/income",
  },
  {
    name: "Expenses",
    icon: FaMoneyCheck,
    path: "/expense",
  },
  {
    name: "Budget",
    icon: FaChartPie,
    path: "/budget",
  },
  // {
  //   name: "Investments",
  //   icon: FaPiggyBank,
  //   path: "/investment",
  // },
  {
    name: "Settings",
    icon: FaCog,
    path: "/settings",
  },
];
