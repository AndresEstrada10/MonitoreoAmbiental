// src/pages/Login.jsx
// Página de login con validación usando React Hook Form + Zod
// WCAG 2.1.1: Navegación por teclado completa
// WCAG 1.4.1: Errores mostrados con ícono + texto + color
// WCAG 3.3.3: Mensajes de error específicos

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { usePageTitle } from "../hooks/usePageTitle";

// Esquema de validación con Zod
// WCAG 3.3.3: Mensajes específicos y útiles
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("Ingrese un correo válido (ej. usuario@dominio.com)"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export default function Login() {
  usePageTitle("Iniciar sesión | ClimaWatch");
  const navigate = useNavigate();
  const { login, error: authError, cargando } = useAuth();
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validar en tiempo real
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    const resultado = await login(data.email, data.password);

    if (!resultado) {
      // WCAG 4.1.3: Notificación accesible del error
      toast.error("Credenciales inválidas");
      setError("email", {
        type: "manual",
        message: "Correo o contraseña incorrectos",
      });
    } else {
      toast.success("Sesión iniciada");
      // Redirigir según rol
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-bold text-blue-600">CW</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ClimaWatch</h1>
          <p className="text-blue-100">Sistema de Monitoreo Climático</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Iniciar sesión
          </h2>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="usuario@dominio.com"
                autoComplete="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-950"
                    : "border-slate-300 dark:border-slate-600 focus:ring-blue-500 bg-white dark:bg-slate-700"
                } text-slate-900 dark:text-white`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {/* WCAG 1.4.1: Error con ícono + texto + color */}
              {errors.email && (
                <div
                  id="email-error"
                  className="flex items-start gap-2 mt-2 text-red-600 dark:text-red-400 text-sm"
                >
                  <AlertCircle
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            {/* Campo Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={mostrarPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors pr-10 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-950"
                      : "border-slate-300 dark:border-slate-600 focus:ring-blue-500 bg-white dark:bg-slate-700"
                  } text-slate-900 dark:text-white`}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  {...register("password")}
                />

                {/* Botón mostrar/ocultar contraseña */}
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label={
                    mostrarPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {mostrarPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* WCAG 3.3.3: Mensaje específico */}
              {errors.password && (
                <div
                  id="password-error"
                  className="flex items-start gap-2 mt-2 text-red-600 dark:text-red-400 text-sm"
                >
                  <AlertCircle
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Información de credenciales de prueba */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300">
              <p className="font-semibold mb-1">Credenciales de prueba:</p>
              <p>Admin: admin@climawatch.com / admin1234</p>
              <p>Usuario: usuario@climawatch.com / user1234</p>
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors flex items-center justify-center gap-2"
              aria-busy={cargando}
            >
              {cargando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          {/* Enlace de ayuda */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
            ¿Necesita ayuda?{" "}
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              aria-label="Contacte al administrador"
            >
              Contacte al administrador
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
