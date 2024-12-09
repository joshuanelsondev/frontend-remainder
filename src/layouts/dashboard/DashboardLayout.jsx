import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideNav from "../../components/sideNav/SideNav";
import { AuthContext } from "../../context/AuthContext";

import "./DashboardLayout.scss";

export default function DashboardLayout() {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <SideNav />
      <Outlet />
    </div>
  );
}
