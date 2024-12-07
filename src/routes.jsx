import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LandingLayout from "./layouts/LandingLayout";

import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import DashBoardPage from "./pages/dashboard/DashboardPage";
import ErrorPage from "./pages/error/ErrorPage";
import FeaturesPage from "./pages/features/FeaturesPage";
import LandingPage from "./pages/landing/LandingPage";
import VerificationSuccess from "./pages/verification/VerificationSuccess";
import VerificationFailed from "./pages/verification/VerificationFailed";
import MFASetupPage from "./pages/mfa/MFASetupPage";

export default createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },

      {
        path: "/features",
        element: <FeaturesPage />,
      },
      {
        path: "/dashboard",
        element: <DashBoardPage />,
      },
      {
        path: "/verification-success",
        element: <VerificationSuccess />,
      },
      {
        path: "/verification-failed",
        element: <VerificationFailed />,
      },
      {
        path: "/mfa-setup",
        element: <MFASetupPage />,
      },
    ],
  },
]);
