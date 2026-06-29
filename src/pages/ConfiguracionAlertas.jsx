import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePageTitle } from "../hooks/usePageTitle";
import tutorialVideo from "../media/tutorial.mp4";

const schema = z.object({
  nombre: z.string().min(1, "Requerido"),
  tipoContaminacion: z.string().min(1, "Requerido"),
  nivelMaximo: z.string().min(1, "Requerido"),
  zona: z.string().min(1, "Requerido"),
});

const STORAGE_KEY = "climawatch_alertas";

const alertasIniciales = [
  {
    id: 1,
    nombre: "Alerta PM2.5",
    nivelMaximo: 150,
    zona: "Centro",
    activa: true,
  },
];

const leerAlertasGuardadas = () => {
  if (typeof window === "undefined") {
    return alertasIniciales;
  }

  try {
    const alertasGuardadas = window.localStorage.getItem(STORAGE_KEY);
    if (!alertasGuardadas) {
      return alertasIniciales;
    }

    const parsed = JSON.parse(alertasGuardadas);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : alertasIniciales;
  } catch {
    return alertasIniciales;
  }
};

export default function ConfiguracionAlertas() {
  usePageTitle("Alertas | ClimaWatch");
  const [alertas, setAlertas] = useState(leerAlertasGuardadas);

  const transcripcion = [
    "En el apartado de alertas se",
    "puede acceder mediante el menú",
    "lateral o también se puede",
    "acceder mediante el mismo",
    "dashboard en este atajo que",
    "existe aquí. Aquí lo que podemos",
    "implementar puede ser, por",
    "ejemplo, alerta manta, elegimos",
    "la variable de temperatura. Si",
    "elegimos algo y lo dejamos en",
    "selecciones nos va a decir que",
    "se requiere un parámetro al que",
    "queremos medir, que pongo que el",
    "centro de manta y reportaremos",
    "que la temperatura esta noche",
    "está a 25 grados. Cuando creemos",
    "alerta veremos que aparecerá por",
    "aquí.",
  ].join("\n");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(alertas));
  }, [alertas]);

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
    setAlertas((current) => [...current, { id: Date.now(), ...data, activa: true }]);
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

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6 items-start">
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 md:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Video de apoyo: cómo llenar una alerta
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-6 max-w-3xl">
              Aquí puedes mostrar un video tutorial para guiar al usuario paso a
              paso al crear una alerta. Cuando quieras reemplazarlo por tu video
              definitivo, solo cambia el archivo en <span className="font-semibold">src/media</span>.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-black">
            <video
              controls
              preload="metadata"
              className="w-full h-auto max-h-[70vh] bg-black"
              aria-label="Video tutorial para crear una alerta"
            >
              <source src={tutorialVideo} type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>
          </div>
        </section>

        <aside className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Qué enseña este tutorial
          </h2>
          <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-6 list-decimal list-inside">
            <li>Cómo abrir la pestaña de alertas desde el menú lateral.</li>
            <li>Qué significa cada campo del formulario.</li>
            <li>Cómo guardar la alerta para que quede registrada.</li>
            <li>Cómo revisar abajo la lista de alertas configuradas.</li>
          </ol>

          <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
              Transcripción del video
            </h3>
            <div className="max-h-80 overflow-y-auto rounded-lg bg-slate-50 dark:bg-slate-900/60 p-4 pr-3 text-sm text-slate-600 dark:text-slate-300 leading-7 whitespace-pre-line">
              {transcripcion}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
