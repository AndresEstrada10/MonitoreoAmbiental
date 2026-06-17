import React, { useState } from "react";
import { recomendaciones } from "../data/mockData";
import { Lightbulb } from "lucide-react";

export default function Recomendaciones() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  const recsFiltradas = categoriaSeleccionada === "todas" ? recomendaciones : recomendaciones.filter((r) => r.categoria === categoriaSeleccionada);

  const urgenciaColores = {
    alta: "#ef4444",
    media: "#f59e0b",
    baja: "#3b82f6",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Recomendaciones Inteligentes</h1>

      <div className="flex flex-wrap gap-2">
        {["todas", "agricultura", "transporte", "salud"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-3 py-2 rounded-lg text-sm font-medium capitalize ${
              categoriaSeleccionada === cat ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recsFiltradas.map((rec) => (
          <div key={rec.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border-l-4" style={{ borderLeftColor: urgenciaColores[rec.urgencia] }}>
            <div className="flex items-start gap-3 mb-3">
              <Lightbulb className="w-5 h-5 flex-shrink-0" style={{ color: urgenciaColores[rec.urgencia] }} />
              <h3 className="font-semibold text-slate-900 dark:text-white">{rec.titulo}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{rec.descripcion}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">{rec.categoria}</span>
              <span className="text-xs font-semibold px-2 py-1 rounded text-white" style={{ backgroundColor: urgenciaColores[rec.urgencia] }}>
                {rec.urgencia.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
