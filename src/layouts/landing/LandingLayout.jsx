import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import { ModalProvider } from "../../context/ModalContext";
import ModalRenderer from "../../modals/ModalRenderer";

import "./LandingLayout.scss";

export default function LandingLayout() {
  return (
    <ModalProvider>
      <main className="landing-layout">
        <Nav />
        <ModalRenderer />
        <Outlet />
      </main>
    </ModalProvider>
  );
}
