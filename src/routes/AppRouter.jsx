// src/routes/AppRouter.jsx
// Definición de rutas de la aplicación con protección por rol
// WCAG 2.4.1: Navegación clara y estructura de rutas consistente

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { SkipToContent } from "../components/layout/SkipToContent";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

// Páginas - Usuario General
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sensores from "../pages/Sensores";
import ConfiguracionAlertas from "../pages/ConfiguracionAlertas";
import CalidadAire from "../pages/CalidadAire";
import GenerarReportes from "../pages/GenerarReportes";
import Recomendaciones from "../pages/Recomendaciones";
import Accesibilidad from "../pages/Accesibilidad";
import Guia from "../pages/Guia";

// Páginas - Admin
import RegistroUsuarios from "../pages/admin/RegistroUsuarios";
import Modelo from "../pages/admin/Modelo";

export const AppRouter = () => {
  const { isAutenticado, rol } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useKeyboardShortcuts(
    [
      { key: "1", action: () => navigate("/dashboard") },
      { key: "2", action: () => navigate("/sensores") },
      { key: "3", action: () => navigate("/alertas") },
      { key: "4", action: () => navigate("/reportes") },
      { key: "5", action: () => navigate("/recomendaciones") },
      { key: "6", action: () => navigate("/accesibilidad") },
      { key: "7", action: () => navigate("/admin/usuarios") },
      { key: "8", action: () => navigate("/admin/modelo") },
    ],
    () => setIsSidebarOpen(false),
  );

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Componente para layout con Header + Sidebar
  const Layout = ({ children }) => (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-900">
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
          className="flex-1 min-w-0 overflow-auto bg-slate-50 dark:bg-slate-900"
          role="main"
          tabIndex={-1}
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

      <Route path="/inicio" element={<Navigate to="/dashboard" replace />} />

      {/* Rutas de usuario general y admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sensores"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <Sensores />
          </ProtectedRoute>
        }
      />

      <Route path="/pronostico" element={<Navigate to="/sensores" replace />} />

      <Route
        path="/alertas"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <ConfiguracionAlertas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/calidad-aire"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <CalidadAire />
          </ProtectedRoute>
        }
      />

      <Route path="/historico" element={<Navigate to="/calidad-aire" replace />} />

      <Route
        path="/reportes"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <GenerarReportes />
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

      <Route
        path="/guia"
        element={
          <ProtectedRoute requiredRol={["usuario", "administrador"]}>
            <Guia />
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
        element={<Navigate to="/reportes" replace />}
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
