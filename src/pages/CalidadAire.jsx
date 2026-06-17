import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wind } from "lucide-react";

const schema = z.object({
  zona: z.string().min(1, "Requerido"),
  ciudad: z.string().min(1, "Requerido"),
});

export default function CalidadAire() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [resultados, setResultados] = useState(null);

  const onSubmit = (data) => {
    setResultados({
      zona: data.zona,
      ciudad: data.ciudad,
      indiceAQI: 82,
      estado: "Moderado",
      contaminantes: [
        { nombre: "PM2.5", valor: 45, limite: 35 },
        { nombre: "O3", valor: 52, limite: 100 },
        { nombre: "NO2", valor: 28, limite: 40 },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Consulta de Calidad de Aire</h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Zona</label>
            <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white" {...register("zona")}>
              <option value="">Seleccione</option>
              <option value="Norte">Norte</option>
              <option value="Sur">Sur</option>
              <option value="Centro">Centro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Ciudad</label>
            <input type="text" placeholder="Ej: Bogotá" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white" {...register("ciudad")} />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg h-fit">Buscar</button>
        </form>
      </div>

      {resultados && (
        <div className="space-y-4">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">Índice AQI - {resultados.zona}</p>
                <p className="text-4xl font-bold text-yellow-900 dark:text-yellow-300">{resultados.indiceAQI}</p>
                <p className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mt-1">{resultados.estado}</p>
              </div>
              <Wind className="w-16 h-16 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resultados.contaminantes.map((cont, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{cont.nombre}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{cont.valor}</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                  <div className="h-full rounded-full bg-green-500" style={{ width: "50%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Límite: {cont.limite}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
