import React from "react";
import { usePageTitle } from "../../hooks/usePageTitle";
import { Cpu } from "lucide-react";

export default function Modelo() {
  usePageTitle("Modelo | ClimaWatch");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Modelo de Predicción
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Panel de estado del modelo y parámetros de reentrenamiento.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-blue-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Estado actual del modelo
          </h2>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Versión
            </dt>
            <dd className="text-lg font-semibold text-slate-900 dark:text-white">
              v1.2.4
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Último reentrenamiento
            </dt>
            <dd className="text-lg font-semibold text-slate-900 dark:text-white">
              2026-06-01
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Precisión
            </dt>
            <dd className="text-lg font-semibold text-slate-900 dark:text-white">
              92.7%
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Estado
            </dt>
            <dd className="text-lg font-semibold text-green-700 dark:text-green-400">
              Operativo
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
