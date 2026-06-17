import React from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { useAccesibilidad } from "../context/AccesibilidadContext";
import { Type, Moon, Volume2 } from "lucide-react";

export default function Accesibilidad() {
  usePageTitle("Accesibilidad | ClimaWatch");
  const {
    tamañoTexto,
    actualizarTamano,
    modoOscuro,
    toggleModoOscuro,
    lectorPantalla,
    toggleLectorPantalla,
    altoContraste,
    toggleAltoContraste,
  } = useAccesibilidad();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Configuración de Accesibilidad
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Type className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Tamaño de Texto
          </h2>
        </div>
        <div className="flex gap-3">
          {["pequeño", "mediano", "grande"].map((size) => (
            <button
              key={size}
              onClick={() => actualizarTamano(size)}
              className={`px-4 py-2 rounded-lg font-medium ${
                tamañoTexto === size
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Modo Oscuro
          </h2>
        </div>
        <label
          className="flex items-center gap-4 cursor-pointer"
          role="switch"
          aria-checked={modoOscuro}
        >
          <div
            className={`relative w-14 h-8 rounded-full transition-colors ${
              modoOscuro ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
                modoOscuro ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </div>
          <span className="text-slate-900 dark:text-white font-medium">
            {modoOscuro ? "Activado" : "Desactivado"}
          </span>
          <input
            type="checkbox"
            checked={modoOscuro}
            onChange={toggleModoOscuro}
            className="sr-only"
            aria-label={
              modoOscuro ? "Desactivar modo oscuro" : "Activar modo oscuro"
            }
          />
        </label>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Volume2 className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Lector de Pantalla
          </h2>
        </div>
        <label
          className="flex items-center gap-4 cursor-pointer"
          role="switch"
          aria-checked={lectorPantalla}
        >
          <div
            className={`relative w-14 h-8 rounded-full transition-colors ${lectorPantalla ? "bg-blue-600" : "bg-slate-300"}`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${lectorPantalla ? "translate-x-7" : "translate-x-1"}`}
            />
          </div>
          <span className="text-slate-900 dark:text-white font-medium">
            {lectorPantalla ? "Habilitado" : "Deshabilitado"}
          </span>
          <input
            type="checkbox"
            checked={lectorPantalla}
            onChange={toggleLectorPantalla}
            className="sr-only"
            aria-label={
              lectorPantalla
                ? "Desactivar lector de pantalla"
                : "Activar lector de pantalla"
            }
          />
        </label>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Alto Contraste
          </h2>
        </div>
        <label
          className="flex items-center gap-4 cursor-pointer"
          role="switch"
          aria-checked={altoContraste}
        >
          <div
            className={`relative w-14 h-8 rounded-full transition-colors ${altoContraste ? "bg-blue-600" : "bg-slate-300"}`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${altoContraste ? "translate-x-7" : "translate-x-1"}`}
            />
          </div>
          <span className="text-slate-900 dark:text-white font-medium">
            {altoContraste ? "Activado" : "Desactivado"}
          </span>
          <input
            type="checkbox"
            checked={altoContraste}
            onChange={toggleAltoContraste}
            className="sr-only"
            aria-label={
              altoContraste
                ? "Desactivar alto contraste"
                : "Activar alto contraste"
            }
          />
        </label>
      </div>
    </div>
  );
}
