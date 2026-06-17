import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(1, "Requerido"),
  tipoContaminacion: z.string().min(1, "Requerido"),
  nivelMaximo: z.string().min(1, "Requerido"),
  zona: z.string().min(1, "Requerido"),
});

export default function ConfiguracionAlertas() {
  const [alertas, setAlertas] = useState([
    { id: 1, nombre: "Alerta PM2.5", nivelMaximo: 150, zona: "Centro", activa: true },
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setAlertas([...alertas, { id: Date.now(), ...data, activa: true }]);
    reset();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configuración de Alertas</h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Nueva Alerta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Nombre</label>
            <input type="text" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white" {...register("nombre")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Variable</label>
            <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white" {...register("tipoContaminacion")}>
              <option value="">Seleccione</option>
              <option value="temperatura">Temperatura</option>
              <option value="humedad">Humedad</option>
              <option value="pm25">PM2.5</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Nivel Máximo</label>
            <input type="number" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white" {...register("nivelMaximo")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Zona</label>
            <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white" {...register("zona")}>
              <option value="">Seleccione</option>
              <option value="Norte">Norte</option>
              <option value="Sur">Sur</option>
              <option value="Centro">Centro</option>
            </select>
          </div>
          <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">Crear Alerta</button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Alertas Configuradas</h2>
        <div className="space-y-2">
          {alertas.map((a) => (
            <div key={a.id} className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{a.nombre}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Nivel: {a.nivelMaximo} | Zona: {a.zona}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">ACTIVA</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
