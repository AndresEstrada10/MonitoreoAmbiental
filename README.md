# 🌦️ Sistema de Monitoreo Climático

Interfaz web completa para predicción y monitoreo climático con accesibilidad WCAG 2.2 nivel AA, tema claro/oscuro y diseño responsive.

## 📋 Características

✅ **Dashboard Principal** - Resumen de condiciones climáticas actuales con gráficos en tiempo real  
✅ **Pronóstico** - Vistas diaria y semanal con datos detallados  
✅ **Alertas Climáticas** - Sistema de alertas ordenadas por severidad con filtros  
✅ **Histórico** - Gráficos de tendencias de precipitación y temperatura  
✅ **Recomendaciones** - Consejos preventivos por actividad y urgencia  
✅ **Panel Administrador** - Gestión de datasets y configuración del sistema  
✅ **Accesibilidad WCAG 2.2 AA** - Navegación por teclado, aria-labels, contraste 4.5:1  
✅ **Tema Claro/Oscuro** - Toggle integrado con soporte nativo  
✅ **Responsive** - Funcional en desktop, tablet y móvil  

## 🛠️ Stack Tecnológico

- **React 18** - Framework UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utility-first
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconografía
- **PostCSS & Autoprefixer** - Procesamiento CSS

## 📦 Instalación

1. **Clonar/Descargar el proyecto**
   ```bash
   cd MonitoreoAmbiental
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

4. **Compilar para producción**
   ```bash
   npm run build
   ```

## 🎨 Estructura del Proyecto

```
MonitoreoAmbiental/
├── src/
│   ├── App.jsx              # Componente principal (todo en uno)
│   ├── main.jsx             # Punto de entrada
│   ├── index.css            # Estilos globales con Tailwind
├── index.html               # HTML raíz
├── vite.config.js          # Configuración Vite
├── tailwind.config.js      # Configuración Tailwind
├── postcss.config.js       # Configuración PostCSS
├── package.json            # Dependencias y scripts
└── .gitignore             # Archivos ignorados por Git
```

## 🎯 Vistas Disponibles

### 1. Dashboard
- Resumen de condiciones climáticas con tarjetas informativas
- Indicador semáforo de estado climático (Verde/Amarillo/Rojo)
- Gráfico de líneas: Temperatura y Humedad últimas 24h

### 2. Pronóstico
- **Vista Diaria**: Hora a hora del día actual
- **Vista Semanal**: Resumen 7 días con precipitación esperada

### 3. Alertas
- Lista ordenada por severidad (Alta/Media/Baja)
- Filtros por tipo de evento (Lluvia, Tormenta, Calor, Viento)
- Información: tipo, zona, hora, descripción

### 4. Histórico
- Gráfico de barras: Precipitación mensual
- Gráfico de líneas: Temperatura promedio 12 meses
- Selector de rango temporal

### 5. Recomendaciones
- Tarjetas con consejos según condición climática
- Categorías: Agricultura, Transporte, Salud, Actividades
- Niveles de urgencia (Alta/Media/Baja)

### 6. Panel Admin
- Tabla de datasets cargados (nombre, fecha, registros, estado)
- Configuración de intervalo de actualización (5/15/30/60 min)
- Botones para subir dataset y reentrenar modelo

## ♿ Accesibilidad (WCAG 2.2 AA)

- ✅ **Navegación por teclado**: Tab, Enter, Escape funcionales
- ✅ **Aria-labels descriptivos** en todos los controles interactivos
- ✅ **Contraste 4.5:1** en textos normales (verificado con Tailwind)
- ✅ **Foco visible** (anillo azul) en elementos interactivos
- ✅ **Mensajes de error** con texto + icono + color
- ✅ **Aria-live regions** para alertas dinámicas
- ✅ **Atributo lang="es"** en HTML raíz
- ✅ **Íconos con aria-hidden** cuando son decorativos

## 🌓 Modo Oscuro

El toggle de modo oscuro en el header cambia automáticamente:
- Fondo: Blanco ↔ Gris oscuro
- Texto: Negro ↔ Blanco
- Gráficos: Colores ajustados para legibilidad
- Persistencia: Se puede agregar localStorage en futuras versiones

## 📊 Datos Mock

Todos los datos son simulados (objetos JavaScript) y están en `App.jsx`:
- `mockClima`: Condiciones actuales
- `mockPronosticoDiario`: Hora a hora
- `mockPronosticoSemanal`: 7 días
- `mockAlertas`: Alertas activas
- `mockRecomendaciones`: Consejos preventivos
- `mockHistorial`: Datos históricos 12 meses
- `mockDatasets`: Datasets cargados en admin

Para conectar a una API real:
1. Reemplazar imports de mock por fetch/axios
2. Manejar loading states con useState
3. Usar useEffect para actualización automática

## 🎨 Paleta de Colores

- **Primario**: Azul `#1e40af` (blue-600)
- **Secundario**: Gris `#64748b` (slate-600)
- **Éxito**: Verde `#22c55e` (green-500)
- **Alerta**: Amarillo `#eab308` (yellow-400)
- **Crítico**: Rojo `#ef4444` (red-500)
- **Info**: Azul `#3b82f6` (blue-500)

## 📱 Breakpoints Responsive

- **Móvil**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Todos los componentes se adaptan automáticamente con Tailwind.

## 🔧 Personalización

### Cambiar colores
Editar `tailwind.config.js` en la sección `theme.extend.colors`

### Agregar nuevas alertas
Añadir objetos a `mockAlertas` en `App.jsx`

### Modificar intervalo de actualización
Cambiar valores en el selector del Panel Admin

### Ajustar gráficos
Recharts acepta props adicionales en `<LineChart>`, `<BarChart>`, etc.

## 📝 Notas de Desarrollo

- El proyecto usa un único componente `App.jsx` para simplificar distribución
- La navegación se maneja con `useState` en lugar de React Router
- Todos los estilos son inline con Tailwind (sin CSS externo)
- Los gráficos usan Recharts con soporte para tooltips accesibles

## 🚀 Próximos Pasos Opcionales

- [ ] Conectar a API real de datos climáticos
- [ ] Implementar persistencia con localStorage/sessionStorage
- [ ] Agregar autenticación de usuarios
- [ ] Notificaciones push para alertas críticas
- [ ] Exportar reportes (PDF/CSV)
- [ ] Integración con mapas interactivos
- [ ] Multiidioma (i18n)

## 📄 Licencia

Proyecto educativo - libre para uso y modificación.

---

**Desarrollado con ❤️ para accesibilidad, usabilidad y experiencia del usuario.**
