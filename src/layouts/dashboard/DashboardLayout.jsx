import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideNav from "../../components/sideNav/SideNav";
import Header from "../../components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import { UserDataProvider } from "../../context/UserDataContext";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <UserDataProvider>
      <div className="dashboard-layout">
        <SideNav />
        <div className="outlet">
          <Header />
          <Outlet />
        </div>
      </div>
    </UserDataProvider>
  );
}
