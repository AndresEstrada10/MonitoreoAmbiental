// src/data/mockData.js
// Datos simulados para el sistema ClimaWatch

export const climaActual = {
  temperatura: 28.4,
  humedad: 72,
  viento: 18,
  lluvia: 5.2,
  condicion: "Parcialmente nublado",
  indiceCalidadAire: 65,
  nivelRiesgo: "moderado",
  ultimaActualizacion: "2025-06-07T14:30:00",
};

export const pronosticoDiario = [
  { hora: "06:00", temperatura: 22, humedad: 80, condicion: "Nublado", lluvia: 0 },
  { hora: "09:00", temperatura: 25, humedad: 74, condicion: "Parcial nublado", lluvia: 0 },
  { hora: "12:00", temperatura: 29, humedad: 65, condicion: "Soleado", lluvia: 0 },
  { hora: "15:00", temperatura: 31, humedad: 58, condicion: "Soleado", lluvia: 0 },
  { hora: "18:00", temperatura: 27, humedad: 70, condicion: "Lluvia ligera", lluvia: 3.1 },
  { hora: "21:00", temperatura: 23, humedad: 85, condicion: "Lluvia", lluvia: 8.4 },
];

export const pronosticoSemanal = [
  { dia: "Lun", fecha: "09/06", tempMax: 31, tempMin: 20, condicion: "Soleado", icono: "sun", riesgo: "bajo" },
  { dia: "Mar", fecha: "10/06", tempMax: 28, tempMin: 19, condicion: "Parcial nublado", icono: "cloud-sun", riesgo: "bajo" },
  { dia: "Mié", fecha: "11/06", tempMax: 24, tempMin: 18, condicion: "Lluvia", icono: "cloud-rain", riesgo: "moderado" },
  { dia: "Jue", fecha: "12/06", tempMax: 22, tempMin: 17, condicion: "Tormenta", icono: "cloud-lightning", riesgo: "alto" },
  { dia: "Vie", fecha: "13/06", tempMax: 26, tempMin: 19, condicion: "Nublado", icono: "cloud", riesgo: "moderado" },
  { dia: "Sáb", fecha: "14/06", tempMax: 30, tempMin: 21, condicion: "Soleado", icono: "sun", riesgo: "bajo" },
  { dia: "Dom", fecha: "15/06", tempMax: 29, tempMin: 20, condicion: "Parcial nublado", icono: "cloud-sun", riesgo: "bajo" },
];

export const alertas = [
  { id: 1, tipo: "Tormenta eléctrica", severidad: "alta", zona: "Zona Norte", hora: "14:30", descripcion: "Se esperan tormentas con aparato eléctrico entre las 6pm y 10pm.", leida: false },
  { id: 2, tipo: "Lluvia fuerte", severidad: "media", zona: "Zona Sur", hora: "13:15", descripcion: "Acumulado de lluvia superior a 30mm previsto para la tarde.", leida: false },
  { id: 3, tipo: "Viento fuerte", severidad: "media", zona: "Zona Este", hora: "11:00", descripcion: "Vientos sostenidos de 60 km/h con ráfagas de hasta 80 km/h.", leida: false },
  { id: 4, tipo: "Calor extremo", severidad: "alta", zona: "Zona Oeste", hora: "10:45", descripcion: "Temperatura máxima de 38°C prevista. Índice UV muy alto.", leida: true },
  { id: 5, tipo: "Niebla densa", severidad: "baja", zona: "Zona Central", hora: "06:00", descripcion: "Visibilidad reducida a menos de 200 metros hasta las 10am.", leida: false },
];

export const recomendaciones = [
  { id: 1, titulo: "Evite zonas inundables", descripcion: "Las lluvias previstas pueden generar acumulación en zonas bajas. Evite transitar por esas áreas.", urgencia: "alta", categoria: "transporte", icono: "triangle-alert" },
  { id: 2, titulo: "Hidratación constante", descripcion: "Con temperaturas superiores a 30°C, consuma al menos 2 litros de agua al día.", urgencia: "media", categoria: "salud", icono: "droplets" },
  { id: 3, titulo: "Proteja sus cultivos", descripcion: "Las tormentas eléctricas pueden afectar estructuras. Asegure invernaderos y equipos agrícolas.", urgencia: "alta", categoria: "agricultura", icono: "sprout" },
  { id: 4, titulo: "Use protector solar", descripcion: "El índice UV será de 9 (muy alto). Use protector FPS 50+ y evite exposición entre 11am y 3pm.", urgencia: "media", categoria: "salud", icono: "sun" },
  { id: 5, titulo: "Revise su vehículo", descripcion: "Verifique limpiaparabrisas y frenos antes de conducir en condiciones de lluvia intensa.", urgencia: "media", categoria: "transporte", icono: "car" },
];

export const historialMensual = [
  { mes: "Ene", lluviaTotal: 45, tempPromedio: 26 },
  { mes: "Feb", lluviaTotal: 60, tempPromedio: 27 },
  { mes: "Mar", lluviaTotal: 120, tempPromedio: 25 },
  { mes: "Abr", lluviaTotal: 180, tempPromedio: 23 },
  { mes: "May", lluviaTotal: 95, tempPromedio: 22 },
  { mes: "Jun", lluviaTotal: 55, tempPromedio: 21 },
  { mes: "Jul", lluviaTotal: 30, tempPromedio: 20 },
  { mes: "Ago", lluviaTotal: 25, tempPromedio: 21 },
  { mes: "Sep", lluviaTotal: 70, tempPromedio: 23 },
  { mes: "Oct", lluviaTotal: 130, tempPromedio: 24 },
  { mes: "Nov", lluviaTotal: 160, tempPromedio: 25 },
  { mes: "Dic", lluviaTotal: 80, tempPromedio: 26 },
];

export const datasets = [
  { id: 1, nombre: "dataset_clima_2023.csv", fechaCarga: "2024-01-10", registros: 8760, estado: "activo" },
  { id: 2, nombre: "dataset_clima_2024.csv", fechaCarga: "2025-01-08", registros: 8784, estado: "activo" },
  { id: 3, nombre: "dataset_prueba.csv", fechaCarga: "2025-03-15", registros: 720, estado: "inactivo" },
];

export const usuarios = [
  { id: 1, nombre: "Ana Torres", correo: "ana@climawatch.com", rol: "administrador" },
  { id: 2, nombre: "Luis Mendoza", correo: "luis@climawatch.com", rol: "usuario" },
  { id: 3, nombre: "Carla Ruiz", correo: "carla@climawatch.com", rol: "usuario" },
];
