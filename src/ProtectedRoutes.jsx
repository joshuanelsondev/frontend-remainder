import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}
