import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePageTitle } from "../hooks/usePageTitle";

const schema = z.object({
  nombre: z.string().min(1, "Requerido"),
  ubicacion: z.string().min(1, "Requerido"),
  tipoSensor: z.string().min(1, "Requerido"),
  estado: z.string().optional(),
  zona: z.string().min(1, "Requerido"),
  descripcion: z.string().max(200, "Máximo 200 caracteres").optional(),
});

const STORAGE_KEY = "climawatch_sensores";

const sensoresIniciales = [
  {
    id: 1,
    nombre: "Sensor Temperatura Centro",
    ubicacion: "Centro",
    tipoSensor: "temperatura",
    estado: "activo",
    zona: "Norte",
  },
];

const leerSensoresGuardados = () => {
  if (typeof window === "undefined") {
    return sensoresIniciales;
  }

  try {
    const sensoresGuardados = window.localStorage.getItem(STORAGE_KEY);
    if (!sensoresGuardados) {
      return sensoresIniciales;
    }

    const parsed = JSON.parse(sensoresGuardados);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : sensoresIniciales;
  } catch {
    return sensoresIniciales;
  }
};

export default function Sensores() {
  usePageTitle("Sensores | ClimaWatch");
  const [sensores, setSensores] = useState(leerSensoresGuardados);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sensores));
  }, [sensores]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setSensores((current) => [...current, { id: Date.now(), ...data }]);
    reset();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Registro de Sensores
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Nuevo Sensor
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label
              htmlFor="sensor-nombre"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Nombre
            </label>
            <input
              id="sensor-nombre"
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.nombre ? "true" : "false"}
              aria-describedby={
                errors.nombre ? "sensor-nombre-error" : undefined
              }
              {...register("nombre")}
            />
            {errors.nombre && (
              <p id="sensor-nombre-error" className="text-red-600 text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="sensor-ubicacion"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Ubicación
            </label>
            <input
              id="sensor-ubicacion"
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.ubicacion ? "true" : "false"}
              aria-describedby={
                errors.ubicacion ? "sensor-ubicacion-error" : undefined
              }
              {...register("ubicacion")}
            />
            {errors.ubicacion && (
              <p
                id="sensor-ubicacion-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.ubicacion.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="sensor-tipo"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Tipo
            </label>
            <select
              id="sensor-tipo"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.tipoSensor ? "true" : "false"}
              aria-describedby={
                errors.tipoSensor ? "sensor-tipo-error" : undefined
              }
              {...register("tipoSensor")}
            >
              <option value="">Seleccione</option>
              <option value="temperatura">Temperatura</option>
              <option value="humedad">Humedad</option>
            </select>
            {errors.tipoSensor && (
              <p id="sensor-tipo-error" className="text-red-600 text-sm mt-1">
                {errors.tipoSensor.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="sensor-zona"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Zona
            </label>
            <input
              id="sensor-zona"
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.zona ? "true" : "false"}
              aria-describedby={errors.zona ? "sensor-zona-error" : undefined}
              {...register("zona")}
            />
            {errors.zona && (
              <p id="sensor-zona-error" className="text-red-600 text-sm mt-1">
                {errors.zona.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Registrar Sensor
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
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {sensores.map((s) => (
              <tr
                key={s.id}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <td className="px-4 py-3 text-slate-900 dark:text-white">
                  {s.nombre}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {s.tipoSensor}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    {s.estado}
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
