import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";
import "./LandingLayout.scss";

export default function Layout() {
  return (
    <main className="landing-layout">
      <Nav />
      <Outlet />
    </main>
  );
}