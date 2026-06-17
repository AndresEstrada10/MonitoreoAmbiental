// src/context/AccesibilidadContext.jsx
// Gestión de preferencias de accesibilidad: tamaño texto, modo oscuro, lector de pantalla
// WCAG 1.4.4: Redimensionar texto
// WCAG 1.3.3: Características sensoriales
// WCAG 4.1.3: Mensajes de estado accesibles

import React, { createContext, useState, useEffect, useCallback } from "react";

export const AccesibilidadContext = createContext();

export const AccesibilidadProvider = ({ children }) => {
  // Estados con valores por defecto
  const [tamañoTexto, setTamañoTexto] = useState(() => {
    return localStorage.getItem("a11y_tamano") || "mediano";
  });

  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem("a11y_dark_mode") === "true" || false;
  });

  const [lectorPantalla, setLectorPantalla] = useState(() => {
    return localStorage.getItem("a11y_screen_reader") === "true" || false;
  });

  const [altoContraste, setAltoContraste] = useState(() => {
    return localStorage.getItem("a11y_high_contrast") === "true" || false;
  });

  const [anuncioA11y, setAnuncioA11y] = useState("");

  // Persistir en localStorage cuando cambian los valores
  useEffect(() => {
    localStorage.setItem("a11y_tamano", tamañoTexto);
  }, [tamañoTexto]);

  useEffect(() => {
    localStorage.setItem("a11y_dark_mode", modoOscuro);
    // Aplicar clase 'dark' al documentElement
    if (modoOscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [modoOscuro]);

  useEffect(() => {
    localStorage.setItem("a11y_screen_reader", lectorPantalla);
  }, [lectorPantalla]);

  useEffect(() => {
    localStorage.setItem("a11y_high_contrast", altoContraste);
    if (altoContraste) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [altoContraste]);

  // Obtener clase de tamaño para aplicar al body
  const getTamañoClass = useCallback(() => {
    const map = {
      pequeño: "text-sm",
      mediano: "text-base",
      grande: "text-lg",
    };
    return map[tamañoTexto] || "text-base";
  }, [tamañoTexto]);

  // Anunciar cambios para lectores de pantalla
  // WCAG 4.1.3: aria-live para notificaciones
  const anunciarCambio = useCallback((mensaje) => {
    setAnuncioA11y(mensaje);
    // Limpiar el anuncio después de que se lea
    setTimeout(() => setAnuncioA11y(""), 1000);
  }, []);

  // Actualizar tamaño y anunciar
  const actualizarTamano = useCallback((nuevoTamano) => {
    setTamañoTexto(nuevoTamano);
    const mensajes = {
      pequeño: "Tamaño de texto reducido a pequeño",
      mediano: "Tamaño de texto restaurado a mediano",
      grande: "Tamaño de texto aumentado a grande",
    };
    anunciarCambio(mensajes[nuevoTamano]);
  }, [anunciarCambio]);

  const toggleModoOscuro = useCallback(() => {
    setModoOscuro((prev) => {
      const nuevo = !prev;
      anunciarCambio(
        nuevo ? "Modo oscuro activado" : "Modo oscuro desactivado"
      );
      return nuevo;
    });
  }, [anunciarCambio]);

  const toggleLectorPantalla = useCallback(() => {
    setLectorPantalla((prev) => {
      const nuevo = !prev;
      anunciarCambio(
        nuevo
          ? "Compatibilidad con lector de pantalla activada"
          : "Compatibilidad con lector de pantalla desactivada"
      );
      return nuevo;
    });
  }, [anunciarCambio]);

  const toggleAltoContraste = useCallback(() => {
    setAltoContraste((prev) => {
      const nuevo = !prev;
      anunciarCambio(nuevo ? "Alto contraste activado" : "Alto contraste desactivado");
      return nuevo;
    });
  }, [anunciarCambio]);

  const value = {
    tamañoTexto,
    actualizarTamano,
    modoOscuro,
    toggleModoOscuro,
    lectorPantalla,
    toggleLectorPantalla,
    altoContraste,
    toggleAltoContraste,
    getTamañoClass,
    anuncioA11y,
  };

  return (
    <AccesibilidadContext.Provider value={value}>
      <div
        className={`${getTamañoClass()} ${modoOscuro ? "dark" : ""} ${
          altoContraste ? "high-contrast" : ""
        }`}
      >
        {/* Región viva para anuncios de accesibilidad */}
        {lectorPantalla && (
          <div
            role="status"
            aria-live="assertive"
            aria-atomic="true"
            className="sr-only"
          >
            {anuncioA11y}
          </div>
        )}
        {children}
      </div>
    </AccesibilidadContext.Provider>
  );
};

// Hook personalizado
export const useAccesibilidad = () => {
  const context = React.useContext(AccesibilidadContext);
  if (!context) {
    throw new Error(
      "useAccesibilidad debe ser usado dentro de AccesibilidadProvider"
    );
  }
  return context;
};
