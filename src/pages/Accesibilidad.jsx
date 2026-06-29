import React from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { useAccesibilidad } from "../context/AccesibilidadContext";
import {
  Type,
  Moon,
  Palette,
  Ear,
  MessageSquareText,
  Languages,
} from "lucide-react";
import { traducciones } from "../i18n/translations";

export default function Accesibilidad() {
  const {
    tamañoTexto,
    actualizarTamano,
    modoOscuro,
    toggleModoOscuro,
    lectorPantalla,
    toggleLectorPantalla,
    altoContraste,
    toggleAltoContraste,
    daltonismo,
    toggleDaltonismo,
    idioma,
    toggleIdioma,
    anunciarCambio,
  } = useAccesibilidad();

  const texto =
    traducciones[idioma]?.accesibilidad || traducciones.es.accesibilidad;
  usePageTitle(
    texto.title === "Accessibility Settings"
      ? "Accessibility | ClimaWatch"
      : "Accesibilidad | ClimaWatch",
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        {texto.title}
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Languages className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {texto.languageTitle}
          </h2>
        </div>
        <button
          type="button"
          onClick={toggleIdioma}
          className="flex items-center gap-4 cursor-pointer wcag-focusable rounded-lg px-2 py-2"
          role="switch"
          aria-checked={idioma === "en"}
          aria-label={
            idioma === "en" ? texto.languageOff : texto.languageToggle
          }
        >
          <div
            className={`relative w-14 h-8 rounded-full transition-colors ${idioma === "en" ? "bg-purple-600" : "bg-slate-300"}`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${idioma === "en" ? "translate-x-7" : "translate-x-1"}`}
            />
          </div>
          <span className="text-slate-900 dark:text-white font-medium">
            {idioma === "en" ? texto.languageOn : texto.languageOff}
          </span>
        </button>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-6 max-w-3xl">
          {texto.languageDescription}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Type className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {texto.textSize}
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
        <button
          type="button"
          onClick={toggleModoOscuro}
          className="flex items-center gap-4 cursor-pointer wcag-focusable rounded-lg px-2 py-2"
          role="switch"
          aria-checked={modoOscuro}
          aria-label={
            modoOscuro ? "Desactivar modo oscuro" : "Activar modo oscuro"
          }
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
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Colores para Daltonismo
          </h2>
        </div>
        <button
          type="button"
          onClick={toggleDaltonismo}
          className="flex items-center gap-4 cursor-pointer wcag-focusable rounded-lg px-2 py-2"
          role="switch"
          aria-checked={daltonismo}
          aria-label={
            daltonismo
              ? "Desactivar colores para daltonismo"
              : "Activar colores para daltonismo"
          }
        >
          <div
            className={`relative w-14 h-8 rounded-full transition-colors ${daltonismo ? "bg-emerald-600" : "bg-slate-300"}`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${daltonismo ? "translate-x-7" : "translate-x-1"}`}
            />
          </div>
          <span className="text-slate-900 dark:text-white font-medium">
            {daltonismo ? "Activado" : "Desactivado"}
          </span>
        </button>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-6 max-w-3xl">
          Esta alternativa ajusta colores semánticos de la interfaz a una paleta
          más distinguible para personas con daltonismo. Cambia principalmente
          alertas, estados y acentos visuales.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Ear className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Lector de Pantalla
          </h2>
        </div>
        <button
          type="button"
          onClick={toggleLectorPantalla}
          className="flex items-center gap-4 cursor-pointer wcag-focusable rounded-lg px-2 py-2"
          role="switch"
          aria-checked={lectorPantalla}
          aria-label={
            lectorPantalla
              ? "Desactivar lector de pantalla"
              : "Activar lector de pantalla"
          }
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
        </button>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() =>
              anunciarCambio("Prueba de lector de pantalla activada")
            }
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 wcag-focusable"
          >
            <MessageSquareText className="w-4 h-4" />
            Probar anuncio
          </button>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-6 max-w-3xl">
            Cuando el lector de pantalla está activo, la app anuncia cambios de
            estado como modo oscuro, contraste, tamaños y esta prueba manual.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Alto Contraste
          </h2>
        </div>
        <button
          type="button"
          onClick={toggleAltoContraste}
          className="flex items-center gap-4 cursor-pointer wcag-focusable rounded-lg px-2 py-2"
          role="switch"
          aria-checked={altoContraste}
          aria-label={
            altoContraste
              ? "Desactivar alto contraste"
              : "Activar alto contraste"
          }
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
        </button>
      </div>
    </div>
  );
}
