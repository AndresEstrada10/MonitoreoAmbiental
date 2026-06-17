// src/components/layout/SkipToContent.jsx
// Link para saltar al contenido principal
// WCAG 2.4.1: Skip links permiten navegar directamente al contenido
// El elemento debe estar visible al recibir foco (tab)

export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:text-base"
      aria-label="Saltar al contenido principal"
    >
      Saltar al contenido principal
    </a>
  );
};
