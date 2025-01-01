import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";
import { getAllIncomes } from "../api/incomeApi.js";
import { getAllExpenses } from "../api/expenseApi.js";
import { getBudget } from "../api/budgetApi.js";
import { getComparisons } from "../api/comparisonsApi.js";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    incomes: [],
    expenses: [],
    budget: { totalIncome: 0, totalExpenses: 0, disposableIncome: 0 },
  });

  const getUserData = throttle(async (year) => {
    try {
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;

      const [incomes, expenses, budget, comparisons] = await Promise.all([
        getAllIncomes(),
        getAllExpenses(),
        getBudget(),
        getComparisons(startDate, endDate),
      ]);

      setUserData({ incomes, expenses, budget, comparisons });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, 5000);

  useEffect(() => {
    getUserData(selectedYear);
  }, [selectedYear]);

  const memoizedUserData = useMemo(() => userData, [userData]);

  return (
    <UserDataContext.Provider
      value={{
        userData: memoizedUserData,
        getUserData,
        selectedYear,
        setSelectedYear,
        isLoading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
