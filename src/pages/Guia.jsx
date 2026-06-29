import React from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { PlayCircle, CheckCircle2, FileVideo } from "lucide-react";
import tutorialVideo from "../media/tutorial.mp4";

export default function Guia() {
  usePageTitle("Guía de inicio | ClimaWatch");

  const pasos = [
    "Inicia sesión con tu cuenta de prueba o con tu usuario real.",
    "Usa el panel lateral para entrar a sensores, alertas, reportes y recomendaciones.",
    "Consulta el dashboard para ver el estado general y los accesos rápidos.",
    "Abre esta guía cuando quieras volver a ver los primeros pasos.",
  ];

  const transcripcion = [
    "Hola, estamos aquí en un vídeo",
    "tutorial de cómo usar la",
    "aplicación de ClimaWatch, para",
    "esto lo primero que tenemos es",
    "la inicia sesión, lo que tenemos",
    "que hacer es ubicar lo que es el",
    "usuario con nuestro correo, aquí",
    "tenemos un correo de pruebas y",
    "la contraseña que vendría siendo",
    "este de aquí que también es de",
    "pruebas, podemos tan elementos",
    "como ocultar contraseña o",
    "mostrarla y también podemos",
    "poner iniciar sesión. Una vez",
    "dentro de la aplicación tenemos",
    "un dashboard, si pensamos que",
    "todo está muy pequeño podemos",
    "hacer esto más grande y se va a",
    "ver más claro, las letras más",
    "grandes, los tamaños de los",
    "cuadros, todo está más grande.",
    "También podríamos activar el",
    "modo oscuro si se nos hace más",
    "cómodo a la vista y activar",
    "mayor contraste, pero en mi caso",
    "yo quisiera activarlo. Luego en",
    "el apartado de calidad de aire",
    "podemos buscar los reportes que",
    "existen en algún lugar en",
    "específico, por ejemplo en el",
    "norte de Bogotá, si le damos a",
    "buscar podemos ver que el índice",
    "es de 82 lo cual es moderado y",
    "muestra un color que es como",
    "naranja amarillo que indica lo",
    "que es estabilidad. También",
    "tenemos otros datos que están",
    "por aquí, el o el no, el PM 2.5",
    "están en los valores normales.",
    "Si queremos ver recomendaciones",
    "como evitar zonas inundables,",
    "hidratación consistente, uso de",
    "protector solar en caso de que",
    "el sol sea demasiado fuerte en",
    "especial entre las 11 de la",
    "mañana y 3 de la tarde y otras",
    "cosas más incluso con sus",
    "categorías, por ejemplo hay",
    "recomendaciones para lo que son",
    "los cultivos, recomendaciones",
    "para el transporte, si la zona",
    "está muy inundada es mejor tener",
    "cuidado con tu vehículo y",
    "verificar limpiaparabrisas u",
    "otras cosas más que se pueden",
    "estar dañando por culpa del",
    "clima extremo o también factores",
    "de salud como por ejemplo",
    "hidratación constante porque",
    "salir en un día muy soleado y",
    "muy caluroso y no hidratarse",
    "podría ser peligroso para la",
    "salud y también prevenir el",
    "cáncer de piel. Al usar",
    "protector solar podemos generar",
    "una alerta y sensores.",
  ].join("\n");
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Guía de inicio
        </h1>
        <p className="text-slate-600 dark:text-slate-400 leading-7 max-w-3xl">
          Esta sección muestra un video tutorial estático para explicar los
          primeros pasos de la aplicación. Coloca tu archivo en
          <span className="font-semibold"> public/tutorial.mp4</span> para que
          se reproduzca en esta pantalla.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6 items-start">
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <PlayCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Video tutorial
            </h2>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-black">
            <video
              controls
              preload="metadata"
              className="w-full h-auto max-h-[70vh] bg-black"
              aria-label="Video tutorial de primeros pasos"
            >
              <source src={tutorialVideo} type="video/mp4" />
              Tu navegador no soporta video HTML5. Coloca el archivo en
              src/media/tutorial.mp4 o muévelo a public/tutorial.mp4 para verlo aquí.
            </video>
          </div>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-6">
            Si tu video tiene otro nombre, cambia la ruta del elemento video.
            Puedes usar un archivo MP4 local para que todos los usuarios lo
            vean sin depender de internet.
          </p>
        </section>

        <aside className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileVideo className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Qué enseña este video
            </h2>
          </div>

          <ol className="space-y-4">
            {pasos.map((paso, index) => (
              <li key={paso} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Paso {index + 1}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-6">
                    {paso}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
              Transcripción del video
            </h3>
            <div className="max-h-80 overflow-y-auto rounded-lg bg-slate-50 dark:bg-slate-900/60 p-4 text-sm text-slate-600 dark:text-slate-300 leading-7 whitespace-pre-line pr-3">
              {transcripcion}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}