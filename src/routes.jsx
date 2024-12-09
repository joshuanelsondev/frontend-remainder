import React, { useContext } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

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
import Incomes from "./pages/incomes/Incomes";
import Expenses from "./pages/expenses/Expenses";
import Budget from "./pages/budget/Budget";
import Investments from "./pages/investments/Investments";
import Settings from "./pages/settings/Settings";

export default function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  const routes = [
    {
      path: "/",
      element: <LandingLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/contact", element: <ContactPage /> },
        { path: "/features", element: <FeaturesPage /> },
        { path: "/verification-success", element: <VerificationSuccess /> },
        { path: "/verification-failed", element: <VerificationFailed /> },
        { path: "/mfa-setup", element: <MFASetupPage /> },
      ],
    },
    ...(isLoggedIn
      ? [
          {
            path: "/dashboard",
            element: <DashboardLayout />,
            errorElement: <ErrorPage />,
            children: [
              { path: "/dashboard", element: <DashboardPage /> },
              { path: "/dashboard/profile", element: <UserProfile /> },
              { path: "/dashboard/incomes", element: <Incomes /> },
              { path: "/dashboard/expenses", element: <Expenses /> },
              { path: "/dashboard/budget", element: <Budget /> },
              { path: "/dashboard/investments", element: <Investments /> },
              { path: "/dashboard/settings", element: <Settings /> },
            ],
          },
        ]
      : []),
    { path: "*", element: <Navigate to="/" replace /> }, // Redirect unknown routes
  ];

  return useRoutes(routes);
}
