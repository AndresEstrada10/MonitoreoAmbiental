// src/context/AccesibilidadContext.jsx
// Gestión de preferencias de accesibilidad: tamaño texto, modo oscuro, lector de pantalla
// WCAG 1.4.4: Redimensionar texto
// WCAG 1.3.3: Características sensoriales
// WCAG 4.1.3: Mensajes de estado accesibles

import React, { createContext, useState, useEffect, useCallback } from "react";

export const AccesibilidadContext = createContext();

export const AccesibilidadProvider = ({ children }) => {
  const [idioma, setIdioma] = useState(() => {
    return localStorage.getItem("a11y_language") || "es";
  });
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

  const [daltonismo, setDaltonismo] = useState(() => {
    return localStorage.getItem("a11y_daltonism") === "true" || false;
  });

  const [anuncioA11y, setAnuncioA11y] = useState("");

  // Aplicar clases oscuro/contraste/tamaño al montar
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", idioma === "en" ? "en-US" : "es-ES");
    root.classList.toggle("dark", modoOscuro);
    root.classList.toggle("high-contrast", altoContraste);
    root.classList.toggle("daltonism-friendly", daltonismo);
    root.classList.toggle("text-sm", tamañoTexto === "pequeño");
    root.classList.toggle("text-base", tamañoTexto === "mediano");
    root.classList.toggle("text-lg", tamañoTexto === "grande");
  }, [modoOscuro, altoContraste, daltonismo, tamañoTexto, idioma]);

  // Persistir en localStorage cuando cambian los valores
  useEffect(() => {
    localStorage.setItem("a11y_tamano", tamañoTexto);
  }, [tamañoTexto]);

  useEffect(() => {
    localStorage.setItem("a11y_dark_mode", modoOscuro);
  }, [modoOscuro]);

  useEffect(() => {
    localStorage.setItem("a11y_screen_reader", lectorPantalla);
  }, [lectorPantalla]);

  useEffect(() => {
    localStorage.setItem("a11y_high_contrast", altoContraste);
  }, [altoContraste]);

  useEffect(() => {
    localStorage.setItem("a11y_daltonism", daltonismo);
  }, [daltonismo]);

  useEffect(() => {
    localStorage.setItem("a11y_language", idioma);
  }, [idioma]);

  // Anunciar cambios para lectores de pantalla
  // WCAG 4.1.3: aria-live para notificaciones
  const anunciarCambio = useCallback((mensaje) => {
    setAnuncioA11y(mensaje);
    // Limpiar el anuncio después de que se lea
    setTimeout(() => setAnuncioA11y(""), 1000);
  }, []);

  // Actualizar tamaño y anunciar
  const actualizarTamano = useCallback(
    (nuevoTamano) => {
      setTamañoTexto(nuevoTamano);
      const mensajes = {
        pequeño: "Tamaño de texto reducido a pequeño",
        mediano: "Tamaño de texto restaurado a mediano",
        grande: "Tamaño de texto aumentado a grande",
      };
      anunciarCambio(mensajes[nuevoTamano]);
    },
    [anunciarCambio],
  );

  const toggleModoOscuro = useCallback(() => {
    setModoOscuro((prev) => {
      const nuevo = !prev;
      anunciarCambio(
        nuevo ? "Modo oscuro activado" : "Modo oscuro desactivado",
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
          : "Compatibilidad con lector de pantalla desactivada",
      );
      return nuevo;
    });
  }, [anunciarCambio]);

  const toggleAltoContraste = useCallback(() => {
    setAltoContraste((prev) => {
      const nuevo = !prev;
      anunciarCambio(
        nuevo ? "Alto contraste activado" : "Alto contraste desactivado",
      );
      return nuevo;
    });
  }, [anunciarCambio]);

  const toggleDaltonismo = useCallback(() => {
    setDaltonismo((prev) => {
      const nuevo = !prev;
      anunciarCambio(
        nuevo
          ? "Paleta para daltonismo activada"
          : "Paleta para daltonismo desactivada",
      );
      return nuevo;
    });
  }, [anunciarCambio]);

  const toggleIdioma = useCallback(() => {
    setIdioma((prev) => {
      const nuevo = prev === "en" ? "es" : "en";
      anunciarCambio(
        nuevo === "en" ? "English enabled" : "Idioma español activado",
      );
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
    daltonismo,
    toggleDaltonismo,
    idioma,
    toggleIdioma,
    anunciarCambio,
    anuncioA11y,
  };

  return (
    <AccesibilidadContext.Provider value={value}>
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
    </AccesibilidadContext.Provider>
  );
};

// Hook personalizado
export const useAccesibilidad = () => {
  const context = React.useContext(AccesibilidadContext);
  if (!context) {
    throw new Error(
      "useAccesibilidad debe ser usado dentro de AccesibilidadProvider",
    );
  }
  return context;
};
