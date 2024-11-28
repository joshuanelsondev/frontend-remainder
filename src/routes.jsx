import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import Layout from "./Layout";
import ErrorPage from "./pages/error/ErrorPage";

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
    ],
  },
]);
