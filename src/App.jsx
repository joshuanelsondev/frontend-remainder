import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
