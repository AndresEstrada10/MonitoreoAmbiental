// src/components/layout/Header.jsx
// Header fijo con navegación, usuario activo, notificaciones y selector de modo oscuro
// WCAG 2.4.7: Foco visible en botones interactivos
// WCAG 1.4.11: Contraste de componentes no textuales

import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useAccesibilidad } from "../../context/AccesibilidadContext";
import { Menu, Bell, LogOut, Sun, Moon } from "lucide-react";

export const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const { usuario, logout } = useAuth();
  const { modoOscuro, toggleModoOscuro } = useAccesibilidad();

  // WCAG 4.1.2: Contar alertas no leídas
  const alertasNoLeidas = 3; // En app real vendría de contexto

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700"
      role="banner"
      aria-label="Encabezado principal"
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Logo y nombre del sistema */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isSidebarOpen}
          >
            <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              CW
            </div>
            <span className="hidden sm:inline font-bold text-lg text-slate-900 dark:text-white">
              ClimaWatch
            </span>
          </div>
        </div>

        {/* Controles derechos */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Botón notificaciones */}
          <button
            className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            aria-label={`Notificaciones, ${alertasNoLeidas} sin leer`}
          >
            <Bell className="w-5 h-5 text-slate-900 dark:text-white" />
            {alertasNoLeidas > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Toggle modo oscuro */}
          <button
            onClick={toggleModoOscuro}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            aria-label={modoOscuro ? "Activar modo claro" : "Activar modo oscuro"}
            aria-pressed={modoOscuro}
          >
            {modoOscuro ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Información del usuario y logout */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {usuario?.nombre}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {usuario?.correo}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              aria-label="Cerrar sesión"
            >
              <LogOut className="w-5 h-5 text-slate-900 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
