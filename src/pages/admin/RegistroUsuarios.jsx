import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePageTitle } from "../../hooks/usePageTitle";
import { Plus } from "lucide-react";

const schema = z
  .object({
    nombre: z.string().min(3, "Mínimo 3 caracteres"),
    correo: z.string().email("Correo inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string(),
    rol: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default function RegistroUsuarios() {
  usePageTitle("Usuarios | ClimaWatch");
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Ana Torres",
      correo: "ana@climawatch.com",
      rol: "administrador",
    },
    {
      id: 2,
      nombre: "Luis Mendoza",
      correo: "luis@climawatch.com",
      rol: "usuario",
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setUsuarios([
      ...usuarios,
      {
        id: Date.now(),
        nombre: data.nombre,
        correo: data.correo,
        rol: data.rol,
      },
    ]);
    reset();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Registro de Usuarios
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Crear Nuevo Usuario
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label
              htmlFor="usuario-nombre"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Nombre
            </label>
            <input
              id="usuario-nombre"
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.nombre ? "true" : "false"}
              aria-describedby={
                errors.nombre ? "usuario-nombre-error" : undefined
              }
              {...register("nombre")}
            />
            {errors.nombre && (
              <p
                id="usuario-nombre-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="usuario-correo"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Correo
            </label>
            <input
              id="usuario-correo"
              type="email"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.correo ? "true" : "false"}
              aria-describedby={
                errors.correo ? "usuario-correo-error" : undefined
              }
              {...register("correo")}
            />
            {errors.correo && (
              <p
                id="usuario-correo-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.correo.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="usuario-password"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Contraseña
            </label>
            <input
              id="usuario-password"
              type="password"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={
                errors.password ? "usuario-password-error" : undefined
              }
              {...register("password")}
            />
            {errors.password && (
              <p
                id="usuario-password-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="usuario-confirm-password"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Confirmar contraseña
            </label>
            <input
              id="usuario-confirm-password"
              type="password"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              aria-describedby={
                errors.confirmPassword
                  ? "usuario-confirm-password-error"
                  : undefined
              }
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p
                id="usuario-confirm-password-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="usuario-rol"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Rol
            </label>
            <select
              id="usuario-rol"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              {...register("rol")}
            >
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Crear Usuario
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Correo
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Rol
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr
                key={u.id}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <td className="px-4 py-3 text-slate-900 dark:text-white">
                  {u.nombre}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {u.correo}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${u.rol === "administrador" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {u.rol}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
