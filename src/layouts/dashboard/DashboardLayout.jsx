import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideNav from "../../components/sideNav/SideNav";
import Header from "../../components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import { UserDataProvider } from "../../context/UserDataContext";
import { ModalProvider } from "../../context/ModalContext";
import ModalRenderer from "../../modals/ModalRenderer";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <ModalProvider>
      <UserDataProvider>
        <div className="dashboard-layout">
          <SideNav />
          <ModalRenderer />
          <div className="outlet">
            <Header />
            <Outlet />
          </div>
        </div>
      </UserDataProvider>
    </ModalProvider>
  );
}
