import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { getAllIncomes, getAllExpenses, getBudget } from "../api";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    incomes: [],
    expenses: [],
    budget: { totalIncome: 0, totalExpenses: 0, disposableIncome: 0 },
  });

  const getUserData = async () => {
    try {
      const [incomes, expenses, budget] = await Promise.all([
        getAllIncomes(),
        getAllExpenses(),
        getBudget(),
      ]);

      setUserData({ incomes, expenses, budget });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const memoizedUserData = useMemo(() => userData, [userData]);

  return (
    <UserDataContext.Provider
      value={{ userData: memoizedUserData, getUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
