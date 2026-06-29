// src/pages/Dashboard.jsx
// Dashboard principal con tarjetas de resumen, gráficos y alertas
// WCAG 2.6: Estructura clara y accesible
// WCAG 1.4.1: Indicadores visuales siempre acompañados de texto

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { useAuth } from "../context/AuthContext";
import { climaActual, pronosticoDiario, alertas } from "../data/mockData";
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  AlertTriangle,
  Eye,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

// Componente tarjeta de clima reutilizable
const TarjetaClima = ({ titulo, valor, unidad, icon: Icon, variacion }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
    <div className="flex items-start justify-between mb-2">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {titulo}
      </span>
      <Icon className="w-5 h-5 text-blue-500" aria-hidden="true" />
    </div>
    <div className="text-3xl font-bold text-slate-900 dark:text-white">
      {valor}
      <span className="text-lg text-slate-500 ml-1">{unidad}</span>
    </div>
    {variacion && (
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
        vs. ayer:{" "}
        <span className={variacion > 0 ? "text-red-500" : "text-green-500"}>
          {variacion > 0 ? "+" : ""}
          {variacion}
        </span>
      </p>
    )}
  </div>
);

// Componente indicador de riesgo
const SemaferoRiesgo = ({ nivel }) => {
  const config = {
    bajo: {
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-700 dark:text-green-400",
      label: "Condiciones favorables",
      icon: "✓",
    },
    moderado: {
      color: "bg-yellow-100 dark:bg-yellow-900/30",
      textColor: "text-yellow-700 dark:text-yellow-400",
      label: "Precaución recomendada",
      icon: "⚠",
    },
    alto: {
      color: "bg-orange-100 dark:bg-orange-900/30",
      textColor: "text-orange-700 dark:text-orange-400",
      label: "Alerta activa",
      icon: "⚠",
    },
    critico: {
      color: "bg-red-100 dark:bg-red-900/30",
      textColor: "text-red-700 dark:text-red-400",
      label: "Emergencia climática",
      icon: "🚨",
    },
  };

  const c = config[nivel] || config.bajo;

  return (
    <div
      className={`${c.color} rounded-lg p-6 mb-6 border-l-4 ${c.textColor.includes("green") ? "border-green-500" : c.textColor.includes("yellow") ? "border-yellow-500" : c.textColor.includes("orange") ? "border-orange-500" : "border-red-500"}`}
      role="status"
      aria-label={`Estado climático: ${c.label}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{c.icon}</span>
        <h2 className={`text-lg font-bold ${c.textColor}`}>
          Nivel: {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
        </h2>
      </div>
      <p className={c.textColor}>{c.label}</p>
    </div>
  );
};

export default function Dashboard() {
  usePageTitle("Dashboard | ClimaWatch");
  const navigate = useNavigate();
  const { rol } = useAuth();
  const [ultimaActualizacion, setUltimaActualizacion] = useState(new Date());

  useEffect(() => {
    // Simular actualización automática cada 30 segundos
    const intervalo = setInterval(() => {
      setUltimaActualizacion(new Date());
      toast.success("Datos actualizados", {
        description: new Date().toLocaleTimeString("es-ES"),
      });
    }, 30000);

    return () => clearInterval(intervalo);
  }, []);

  // Alertas no leídas
  const alertasNoLeidas = alertas.filter((a) => !a.leida).slice(0, 3);
  const accesosRapidos = [
    {
      label: "Sensores",
      href: "/sensores",
      descripcion: "Registrar y revisar sensores",
    },
    {
      label: "Alertas",
      href: "/alertas",
      descripcion: "Configurar umbrales y alertas",
    },
    {
      label: "Calidad del aire",
      href: "/calidad-aire",
      descripcion: "Consultar AQI y contaminantes",
    },
    {
      label: "Reportes",
      href: "/reportes",
      descripcion: "Generar y descargar reportes",
    },
    {
      label: "Recomendaciones",
      href: "/recomendaciones",
      descripcion: "Ver acciones preventivas",
    },
    {
      label: "Accesibilidad",
      href: "/accesibilidad",
      descripcion: "Ajustar texto, contraste y atajos",
    },
  ];

  if (rol === "administrador") {
    accesosRapidos.push(
      {
        label: "Usuarios",
        href: "/admin/usuarios",
        descripcion: "Gestionar cuentas",
      },
      {
        label: "Modelo",
        href: "/admin/modelo",
        descripcion: "Reentrenar y evaluar modelo",
      },
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 lang="en" className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Última actualización:{" "}
          {ultimaActualizacion.toLocaleTimeString("es-ES")}
        </p>
      </div>

      {/* Indicador de riesgo */}
      <SemaferoRiesgo nivel={climaActual.nivelRiesgo} />

      {/* Accesos rápidos */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Accesos rápidos
          </h2>
          <div className="hover-focus-popover">
            <button
              type="button"
              className="wcag-focusable rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
              aria-describedby="dashboard-shortcuts-help"
            >
              Ayuda
            </button>
            <div
              id="dashboard-shortcuts-help"
              role="tooltip"
              className="hover-focus-popover-content right-0 left-auto"
            >
              Navega con Tab o usa Ctrl + Alt + 1 a 8. Escape cierra paneles emergentes.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {accesosRapidos.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-6">
                    {item.descripcion}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 whitespace-nowrap">
                  {item.href.replace("/", "") || "inicio"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Grid de tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TarjetaClima
          titulo="Temperatura"
          valor={climaActual.temperatura}
          unidad="°C"
          icon={Thermometer}
          variacion={2.1}
        />
        <TarjetaClima
          titulo="Humedad"
          valor={climaActual.humedad}
          unidad="%"
          icon={Droplets}
          variacion={-5}
        />
        <TarjetaClima
          titulo="Viento"
          valor={climaActual.viento}
          unidad="km/h"
          icon={Wind}
          variacion={1.2}
        />
        <TarjetaClima
          titulo="Lluvia"
          valor={climaActual.lluvia}
          unidad="mm"
          icon={CloudRain}
          variacion={3.1}
        />
      </div>

      {/* Gráfico de 24 horas */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Variación últimas 24 horas
        </h2>
        {/* WCAG 1.4.1: aria-label descriptivo para gráfico */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={pronosticoDiario}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              className="dark:stroke-slate-700"
            />
            <XAxis
              dataKey="hora"
              stroke="#64748b"
              className="dark:stroke-slate-400"
            />
            <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperatura"
              stroke="#ef4444"
              name="Temperatura (°C)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="humedad"
              stroke="#3b82f6"
              name="Humedad (%)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Panel de alertas recientes */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle
              className="w-5 h-5 text-orange-500"
              aria-hidden="true"
            />
            Alertas Recientes
          </h2>
          <span className="text-sm px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
            {alertasNoLeidas.length} sin leer
          </span>
        </div>

        {alertasNoLeidas.length > 0 ? (
          <div className="space-y-3">
            {alertasNoLeidas.map((alerta) => (
              <div
                key={alerta.id}
                className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/10 p-3 rounded"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {alerta.tipo}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {alerta.descripcion}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      📍 {alerta.zona} • 🕐 {alerta.hora}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                      alerta.severidad === "alta"
                        ? "bg-red-500 text-white"
                        : alerta.severidad === "media"
                          ? "bg-yellow-500 text-white"
                          : "bg-blue-500 text-white"
                    }`}
                  >
                    {alerta.severidad.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-400">
            No hay alertas activas en este momento
          </p>
        )}

        <button
          type="button"
          onClick={() => navigate("/alertas")}
          className="w-full mt-4 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
          aria-label="Ver todas las alertas"
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          Ver todas las alertas
        </button>
      </div>
    </div>
  );
}
