// src/context/AuthContext.jsx
// Manejo de autenticación, login, logout y rol de usuario
// WCAG 4.1.2: Componente proporciona contexto accesible para mantener estado de usuario

import React, { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [rol, setRol] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Credenciales de prueba para demo
  const usuariosDemo = {
    "admin@climawatch.com": {
      password: "admin1234",
      rol: "administrador",
      nombre: "Admin User",
    },
    "usuario@climawatch.com": {
      password: "user1234",
      rol: "usuario",
      nombre: "Usuario General",
    },
  };

  const login = useCallback((email, password) => {
    return new Promise((resolve) => {
      setCargando(true);
      setError(null);

      // Simular delay de autenticación
      setTimeout(() => {
        const usuarioDemo = usuariosDemo[email];

        if (!usuarioDemo || usuarioDemo.password !== password) {
          setError("Credenciales inválidas. Intente nuevamente.");
          setCargando(false);
          resolve(false);
          return;
        }

        // Login exitoso
        setUsuario({
          correo: email,
          nombre: usuarioDemo.nombre,
        });
        setRol(usuarioDemo.rol);
        setIsAutenticado(true);
        setCargando(false);
        resolve(true);
      }, 500);
    });
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
    setIsAutenticado(false);
    setRol(null);
    setError(null);
  }, []);

  const value = {
    usuario,
    isAutenticado,
    rol,
    cargando,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
