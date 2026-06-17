import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePageTitle } from "../hooks/usePageTitle";

const schema = z.object({
  nombre: z.string().min(1, "Requerido"),
  tipoContaminacion: z.string().min(1, "Requerido"),
  nivelMaximo: z.string().min(1, "Requerido"),
  zona: z.string().min(1, "Requerido"),
});

export default function ConfiguracionAlertas() {
  usePageTitle("Alertas | ClimaWatch");
  const [alertas, setAlertas] = useState([
    {
      id: 1,
      nombre: "Alerta PM2.5",
      nivelMaximo: 150,
      zona: "Centro",
      activa: true,
    },
  ]);

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
    setAlertas([...alertas, { id: Date.now(), ...data, activa: true }]);
    reset();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Configuración de Alertas
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Nueva Alerta
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label
              htmlFor="alerta-nombre"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Nombre
            </label>
            <input
              id="alerta-nombre"
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.nombre ? "true" : "false"}
              aria-describedby={
                errors.nombre ? "alerta-nombre-error" : undefined
              }
              {...register("nombre")}
            />
            {errors.nombre && (
              <p id="alerta-nombre-error" className="text-red-600 text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="alerta-tipo"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Variable
            </label>
            <select
              id="alerta-tipo"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.tipoContaminacion ? "true" : "false"}
              aria-describedby={
                errors.tipoContaminacion ? "alerta-tipo-error" : undefined
              }
              {...register("tipoContaminacion")}
            >
              <option value="">Seleccione</option>
              <option value="temperatura">Temperatura</option>
              <option value="humedad">Humedad</option>
              <option value="pm25">PM2.5</option>
            </select>
            {errors.tipoContaminacion && (
              <p id="alerta-tipo-error" className="text-red-600 text-sm mt-1">
                {errors.tipoContaminacion.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="alerta-nivel"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Nivel Máximo
            </label>
            <input
              id="alerta-nivel"
              type="number"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.nivelMaximo ? "true" : "false"}
              aria-describedby={
                errors.nivelMaximo ? "alerta-nivel-error" : undefined
              }
              {...register("nivelMaximo")}
            />
            {errors.nivelMaximo && (
              <p id="alerta-nivel-error" className="text-red-600 text-sm mt-1">
                {errors.nivelMaximo.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="alerta-zona"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Zona
            </label>
            <select
              id="alerta-zona"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.zona ? "true" : "false"}
              aria-describedby={errors.zona ? "alerta-zona-error" : undefined}
              {...register("zona")}
            >
              <option value="">Seleccione</option>
              <option value="Norte">Norte</option>
              <option value="Sur">Sur</option>
              <option value="Centro">Centro</option>
            </select>
            {errors.zona && (
              <p id="alerta-zona-error" className="text-red-600 text-sm mt-1">
                {errors.zona.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Crear Alerta
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Alertas Configuradas
        </h2>
        <div className="space-y-2">
          {alertas.map((a) => (
            <div
              key={a.id}
              className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {a.nombre}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Nivel: {a.nivelMaximo} | Zona: {a.zona}
                </p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                ACTIVA
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
