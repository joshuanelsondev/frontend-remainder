import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import LandingPage from "./pages/landing/LandingPage";
import ErrorPage from "./pages/error/ErrorPage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import FeaturesPage from "./pages/features/FeaturesPage";
import VerificationSuccess from "./pages/verification/VerificationSuccess";
import VerificationFailed from "./pages/verification/VerificationFailed";

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
        path: "/verification-success",
        element: <VerificationSuccess />,
      },
      {
        path: "/verification-failed",
        element: <VerificationFailed />,
      },
    ],
  },
]);
