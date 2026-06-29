// src/components/layout/Header.jsx
// Header fijo con navegación, usuario activo, notificaciones y selector de modo oscuro
// WCAG 2.4.7: Foco visible en botones interactivos
// WCAG 1.4.11: Contraste de componentes no textuales

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAccesibilidad } from "../../context/AccesibilidadContext";
import { Menu, Bell, LogOut, Sun, Moon, X } from "lucide-react";

export const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const { usuario, logout } = useAuth();
  const { modoOscuro, toggleModoOscuro } = useAccesibilidad();
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

  // WCAG 4.1.2: Contar alertas no leídas
  const alertasNoLeidas = 3; // En app real vendría de contexto

  // Datos de notificaciones de ejemplo
  const notificaciones = [
    {
      id: 1,
      titulo: "Tormenta eléctrica",
      mensaje: "Se esperan tormentas entre las 6pm y 10pm",
      zona: "Zona Norte",
      timestamp: "14:30",
      leida: false,
    },
    {
      id: 2,
      titulo: "Lluvia fuerte",
      mensaje: "Acumulado de lluvia superior a 30mm",
      zona: "Zona Sur",
      timestamp: "13:15",
      leida: false,
    },
    {
      id: 3,
      titulo: "Viento fuerte",
      mensaje: "Vientos sostenidos de 60 km/h",
      zona: "Zona Este",
      timestamp: "11:00",
      leida: false,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const toggleNotificaciones = () => {
    setMostrarNotificaciones(!mostrarNotificaciones);
  };

  useEffect(() => {
    if (!mostrarNotificaciones) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMostrarNotificaciones(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mostrarNotificaciones]);

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
            type="button"
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
          <div className="relative">
            <button
              type="button"
              onClick={toggleNotificaciones}
              className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              aria-label={`Notificaciones, ${alertasNoLeidas} sin leer`}
              aria-expanded={mostrarNotificaciones}
            >
              <Bell className="w-5 h-5 text-slate-900 dark:text-white" />
              {alertasNoLeidas > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Panel de notificaciones */}
            {mostrarNotificaciones && (
              <div className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-1rem))] bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50" role="dialog" aria-label="Notificaciones recientes">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Notificaciones
                  </h3>
                  <button
                    type="button"
                    onClick={toggleNotificaciones}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Cerrar notificaciones"
                  >
                    <X className="w-4 h-4 text-slate-900 dark:text-white" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notificaciones.length > 0 ? (
                    notificaciones.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors ${
                          !notif.leida
                            ? "bg-blue-50 dark:bg-slate-700"
                            : "bg-white dark:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              {notif.titulo}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                              {notif.mensaje}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                              <span>📍 {notif.zona}</span>
                              <span>🕐 {notif.timestamp}</span>
                            </div>
                          </div>
                          {!notif.leida && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                      <p>No hay notificaciones</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Toggle modo oscuro */}
          <button
            onClick={toggleModoOscuro}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            aria-label={
              modoOscuro ? "Activar modo claro" : "Activar modo oscuro"
            }
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
              type="button"
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
