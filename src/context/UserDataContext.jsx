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
import { getComparisons, getComparisonsYears } from "../api/comparisonsApi.js";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

// Provider Function
export const UserDataProvider = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [availableYears, setAvailableYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    incomes: [],
    expenses: [],
    budget: { totalIncome: 0, totalExpenses: 0, disposableIncome: 0 },
  });

  // Make API calls to retrieve user data
  const getUserData = throttle(async (year) => {
    try {
      const [incomes, expenses, budget, comparisons] = await Promise.all([
        getAllIncomes(),
        getAllExpenses(),
        getBudget(),
        getComparisons(selectedYear),
      ]);

      setUserData({ incomes, expenses, budget, comparisons });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, 5000);

  const getAvailableYears = async () => {
    try {
      const years = await getComparisonsYears();
      setAvailableYears(years);
    } catch (error) {
      console.error("Error fetching available years:", error);
    }
  };

  useEffect(() => {
    getAvailableYears();
    getUserData(selectedYear);
  }, []);

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
        availableYears,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
