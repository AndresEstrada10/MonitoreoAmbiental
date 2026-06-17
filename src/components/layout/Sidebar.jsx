// src/components/layout/Sidebar.jsx
// Sidebar colapsable con navegación según rol del usuario
// WCAG 2.1.1: Navegación completamente accesible por teclado
// WCAG 2.4.7: Foco visible en todos los ítems de navegación

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Cloud,
  AlertTriangle,
  BarChart3,
  Lightbulb,
  Settings,
  Users,
  Database,
  Zap,
  X,
} from "lucide-react";

export const Sidebar = ({ isOpen, onClose }) => {
  const { rol } = useAuth();
  const location = useLocation();

  // Ítems de navegación según rol
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      roles: ["usuario", "administrador"],
    },
    {
      id: "pronostico",
      label: "Pronóstico",
      icon: Cloud,
      href: "/pronostico",
      roles: ["usuario", "administrador"],
    },
    {
      id: "alertas",
      label: "Alertas",
      icon: AlertTriangle,
      href: "/alertas",
      roles: ["usuario", "administrador"],
    },
    {
      id: "historico",
      label: "Histórico",
      icon: BarChart3,
      href: "/historico",
      roles: ["usuario", "administrador"],
    },
    {
      id: "recomendaciones",
      label: "Recomendaciones",
      icon: Lightbulb,
      href: "/recomendaciones",
      roles: ["usuario", "administrador"],
    },
    {
      id: "accesibilidad",
      label: "Accesibilidad",
      icon: Settings,
      href: "/accesibilidad",
      roles: ["usuario", "administrador"],
    },
    {
      id: "usuarios",
      label: "Usuarios",
      icon: Users,
      href: "/admin/usuarios",
      roles: ["administrador"],
    },
    {
      id: "datasets",
      label: "Datasets",
      icon: Database,
      href: "/admin/datasets",
      roles: ["administrador"],
    },
    {
      id: "modelo",
      label: "Modelo",
      icon: Zap,
      href: "/admin/modelo",
      roles: ["administrador"],
    },
  ];

  // Filtrar ítems según rol
  const itemsVisibles = navItems.filter((item) => item.roles.includes(rol));

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Overlay en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-[calc(100vh-70px)] bg-slate-800 dark:bg-slate-900 text-white transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40 overflow-y-auto`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <nav className="p-4 space-y-1">
          {/* Botón cerrar en móvil */}
          <button
            type="button"
            onClick={onClose}
            className="md:hidden w-full text-right p-2 mb-4"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 ml-auto" />
          </button>

          {/* Ítems de navegación */}
          {itemsVisibles.map(({ id, label, icon: Icon, href }) => (
            <Link
              key={id}
              to={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset ${
                isActive(href)
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
              aria-current={isActive(href) ? "page" : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};
