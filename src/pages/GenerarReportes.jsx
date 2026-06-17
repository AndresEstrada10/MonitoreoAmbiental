import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePageTitle } from "../hooks/usePageTitle";
import { Download, FileText } from "lucide-react";

const schema = z.object({
  fechaInicio: z.string().min(1, "Requerido"),
  fechaFin: z.string().min(1, "Requerido"),
  tipoMedicion: z.string(),
  formato: z.string(),
});

export default function GenerarReportes() {
  usePageTitle("Reportes | ClimaWatch");
  const [generando, setGenerando] = useState(false);
  const [reportes, setReportes] = useState([
    { id: 1, nombre: "Reporte Enero", fecha: "2025-02-01", formato: "PDF" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setGenerando(true);
    setTimeout(() => {
      setReportes([
        ...reportes,
        {
          id: Date.now(),
          nombre: `Reporte ${data.tipoMedicion}`,
          fecha: data.fechaFin,
          formato: data.formato.toUpperCase(),
        },
      ]);
      setGenerando(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Generación de Reportes
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Crear Reporte
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label
              htmlFor="reporte-fecha-inicio"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Fecha Inicio
            </label>
            <input
              id="reporte-fecha-inicio"
              type="date"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.fechaInicio ? "true" : "false"}
              aria-describedby={
                errors.fechaInicio ? "reporte-fecha-inicio-error" : undefined
              }
              {...register("fechaInicio")}
            />
            {errors.fechaInicio && (
              <p
                id="reporte-fecha-inicio-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.fechaInicio.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="reporte-fecha-fin"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Fecha Fin
            </label>
            <input
              id="reporte-fecha-fin"
              type="date"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.fechaFin ? "true" : "false"}
              aria-describedby={
                errors.fechaFin ? "reporte-fecha-fin-error" : undefined
              }
              {...register("fechaFin")}
            />
            {errors.fechaFin && (
              <p
                id="reporte-fecha-fin-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.fechaFin.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="reporte-tipo"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Tipo
            </label>
            <select
              id="reporte-tipo"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.tipoMedicion ? "true" : "false"}
              aria-describedby={
                errors.tipoMedicion ? "reporte-tipo-error" : undefined
              }
              {...register("tipoMedicion")}
            >
              <option value="temperatura">Temperatura</option>
              <option value="humedad">Humedad</option>
              <option value="calidad_aire">Calidad de Aire</option>
            </select>
            {errors.tipoMedicion && (
              <p id="reporte-tipo-error" className="text-red-600 text-sm mt-1">
                {errors.tipoMedicion.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="reporte-formato"
              className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
            >
              Formato
            </label>
            <select
              id="reporte-formato"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white"
              aria-invalid={errors.formato ? "true" : "false"}
              aria-describedby={
                errors.formato ? "reporte-formato-error" : undefined
              }
              {...register("formato")}
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
            {errors.formato && (
              <p
                id="reporte-formato-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.formato.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={generando}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            {generando ? (
              "Generando..."
            ) : (
              <>
                <Download className="w-4 h-4" /> Generar
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Reportes
        </h2>
        <div className="space-y-2">
          {reportes.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {r.nombre}
                  </p>
                  <p className="text-xs text-slate-500">
                    {r.fecha} • {r.formato}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                aria-label={`Descargar ${r.nombre}`}
              >
                Descargar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
