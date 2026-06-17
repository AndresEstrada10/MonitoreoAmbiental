// src/routes/AppRouter.jsx
// Definición de rutas de la aplicación con protección por rol
// WCAG 2.4.1: Navegación clara y estructura de rutas consistente

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { SkipToContent } from "../components/layout/SkipToContent";

// Páginas - Usuario General
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sensores from "../pages/Sensores";
import ConfiguracionAlertas from "../pages/ConfiguracionAlertas";
import CalidadAire from "../pages/CalidadAire";
import GenerarReportes from "../pages/GenerarReportes";
import Recomendaciones from "../pages/Recomendaciones";
import Accesibilidad from "../pages/Accesibilidad";

// Páginas - Admin
import RegistroUsuarios from "../pages/admin/RegistroUsuarios";
import Modelo from "../pages/admin/Modelo";

export const AppRouter = () => {
  const { isAutenticado, rol } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Componente para layout con Header + Sidebar
  const Layout = ({ children }) => (
    <div className="flex flex-col h-screen">
      <SkipToContent />
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          id="main-content"
          className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900"
          role="main"
        >
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );

  // Ruta protegida por rol
  const ProtectedRoute = ({ children, requiredRol }) => {
    if (!isAutenticado) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRol && !requiredRol.includes(rol)) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Layout>{children}</Layout>;
  };

  return (
    <Routes>
      {/* Ruta de login (sin layout) */}
      <Route path="/login" element={<Login />} />

      {/* Rutas de usuario general y admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Placeholder para otras rutas - las crearemos después */}
      <Route
        path="/pronostico"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <Sensores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/alertas"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <ConfiguracionAlertas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/historico"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <CalidadAire />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recomendaciones"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <Recomendaciones />
          </ProtectedRoute>
        }
      />

      <Route
        path="/accesibilidad"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <Accesibilidad />
          </ProtectedRoute>
        }
      />

      {/* Rutas admin */}
      <Route
        path="/admin/usuarios"
        element={
          <ProtectedRoute requiredRol={["administrador"]}>
            <RegistroUsuarios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/datasets"
        element={
          <ProtectedRoute requiredRol={["administrador"]}>
            <GenerarReportes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/modelo"
        element={
          <ProtectedRoute requiredRol={["administrador"]}>
            <Modelo />
          </ProtectedRoute>
        }
      />

      {/* Redirigir raíz a dashboard o login */}
      <Route
        path="/"
        element={
          <Navigate to={isAutenticado ? "/dashboard" : "/login"} replace />
        }
      />

      {/* Página 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
