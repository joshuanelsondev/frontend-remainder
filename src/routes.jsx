import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./pages/landing/LandingPage";
import ErrorPage from "./pages/error/ErrorPage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/about/ContactPage";
import FeaturesPage from "./pages/about/FeaturesPage";
import PlansAndPricingPage from "./pages/about/PlansAndPricing";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "/plansAndPricing",
        element: <PlansAndPricingPage />,
      },
    ],
  },
]);
