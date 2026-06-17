import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AccesibilidadProvider } from "./context/AccesibilidadContext.jsx";
import { Toaster } from "sonner";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AccesibilidadProvider>
          <App />
          <Toaster richColors position="top-right" />
        </AccesibilidadProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
