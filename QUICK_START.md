# 🚀 Guía de Inicio Rápido

## Paso 1: Instalar dependencias
```bash
npm install
```

## Paso 2: Ejecutar servidor de desarrollo
```bash
npm run dev
```

## Paso 3: Abrir en navegador
Abre [http://localhost:5173](http://localhost:5173) en tu navegador

## Paso 4: Explorar las vistas
- 📊 **Dashboard**: Resumen de condiciones actuales
- 📅 **Pronóstico**: Vistas diaria y semanal
- ⚠️ **Alertas**: Alertas ordenadas por severidad
- 📈 **Histórico**: Gráficos de tendencias históricas
- 💡 **Recomendaciones**: Consejos preventivos por actividad
- ⚙️ **Panel Admin**: Configuración y gestión de datasets

## Características principales

### Navegación
- Sidebar izquierdo con menú de navegación
- Menú hamburguesa en móvil
- Navegación completamente accesible por teclado

### Tema
- Toggle de modo oscuro/claro en el header
- Cambio inmediato de colores
- Fondo adaptativo para gráficos

### Responsive
- Funciona en desktop (1280px+)
- Optimizado para tablet (768px)
- Completamente funcional en móvil (375px)

### Accesibilidad
- WCAG 2.2 Nivel AA
- Tab, Enter, Escape funcionales
- Aria-labels en todos los controles
- Lector de pantalla compatible
- Contraste de color 4.5:1 verificado

## Filtros interactivos

### Pronóstico
- Toggle entre vista diaria y semanal
- Gráfico de precipitación en vista semanal

### Alertas
- Filtrar por tipo: Lluvia, Tormenta, Calor, Viento
- Ordenadas automáticamente por severidad

### Recomendaciones
- Filtrar por categoría: Agricultura, Transporte, Salud
- Códigos de color por urgencia

### Histórico
- Selector de rango temporal (1m/3m/6m/12m)
- Dos gráficos: Precipitación y Temperatura

## Panel Admin

- **Tabla de Datasets**: Ver datasets cargados y estado
- **Configuración de Intervalo**: Seleccionar frecuencia de actualización
- **Botones de Acción**:
  - 📤 Subir Dataset (simulado)
  - ⚡ Reentrenar Modelo (con loader)

## Tips de desarrollo

1. **Modificar datos mock**: Edita `mockClima`, `mockAlertas`, etc. en `src/App.jsx`
2. **Cambiar colores**: Modifica `tailwind.config.js`
3. **Agregar nuevas vistas**: Crea componente y agregalo al `switch` en el renderizado
4. **Conectar API real**: Reemplaza `mockXXX` con fetch/axios en useEffect

## Troubleshooting

**Puerto 5173 en uso**
```bash
npm run dev -- --port 3000
```

**Limpiar caché de node_modules**
```bash
rm -rf node_modules && npm install
```

**Reconstruir sin caché**
```bash
npm run build
```

## Extensiones recomendadas para VS Code

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7 React/Redux/React-Native snippets

¡Listo! 🎉 La aplicación está lista para usar y personalizar.
