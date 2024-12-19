import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get("/users/me");
      setUserData({
        budgetSummary: data.budgetSummary,
        incomeSummary: data.incomeSummary,
        expenseSummary: data.expenseSummary,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, fetchUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
