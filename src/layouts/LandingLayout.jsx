import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";
import { ModalProvider } from "../modals/ModalContext";
import ModalRenderer from "../modals/ModalRenderer";

import "./LandingLayout.scss";

export default function LandingLayout() {
  return (
    <main className="landing-layout">
      <ModalProvider>
        <Nav />
        <ModalRenderer />
        <Outlet />
      </ModalProvider>
    </main>
  );
}
