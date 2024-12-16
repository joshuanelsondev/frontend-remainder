import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      getUserInfo(token);
    }
  }, []);

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const login = (token) => {
    sessionStorage.setItem("authToken", token);
    getUserInfo(token);
  };

  const logout = (navigate) => {
    sessionStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
