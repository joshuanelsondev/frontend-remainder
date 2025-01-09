import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoutes";

// Layouts
import LandingLayout from "./layouts/landing/LandingLayout";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";

// Landing Layout Pages
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import ErrorPage from "./pages/error/ErrorPage";
import FeaturesPage from "./pages/features/FeaturesPage";
import LandingPage from "./pages/landing/LandingPage";
import VerificationSuccess from "./pages/verification/VerificationSuccess";
import VerificationFailed from "./pages/verification/VerificationFailed";
import MFASetupPage from "./pages/mfa/MFASetupPage";

// Dashboard Layout Pages
import DashboardPage from "./pages/dashboard/DashboardPage";
import UserProfile from "./pages/userProfile/UserProfile";
import UserInfo from "./pages/userInfo/UserInfo";
import Income from "./pages/income/Income";
import Expense from "./pages/expense/Expense";
import Budget from "./pages/budget/Budget";
import Investment from "./pages/investment/Investment";
import Settings from "./pages/settings/Settings";

export default function AppRoutes() {
  const sessionToken = sessionStorage.getItem("authToken");

  const landingRoutes = [
    {
      path: "/",
      element: <LandingLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "features", element: <FeaturesPage /> },
        {
          path: "verification-success",
          element: <VerificationSuccess />,
        },
        { path: "verification-failed", element: <VerificationFailed /> },
        { path: "mfa-setup", element: <MFASetupPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
  const dashboardRoutes = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "user-info", element: <UserInfo /> },
        { path: "profile", element: <UserProfile /> },
        { path: "income", element: <Income /> },
        { path: "expense", element: <Expense /> },
        { path: "budget", element: <Budget /> },
        { path: "investment", element: <Investment /> },
        { path: "settings", element: <Settings /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ];

  return useRoutes(sessionToken ? dashboardRoutes : landingRoutes);
}
