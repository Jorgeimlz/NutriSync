// src/config/apiConfig.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {

  AUTH_TOKEN: `${BASE_URL}/api/token/`, 
  // Sección de Usuarios
  USERS: `${BASE_URL}/api/users/`,
  REGISTER: `${BASE_URL}/api/users/register/`, // Endpoint de registro
  CHECK_ADMIN: `${BASE_URL}/api/users/check-admin/`,

  // Sección de Categorías
  CATEGORIAS: `${BASE_URL}/api/categorias/`,
  CATEGORIAS_CREAR: `${BASE_URL}/api/categorias/crear/`,
  CATEGORIAS_DETALLE: (id: number | string) => `${BASE_URL}/api/categorias/${id}/`,

  // Sección de Dietas
  DIETAS: `${BASE_URL}/api/dietas/`,
  DIETAS_AGREGAR: `${BASE_URL}/api/dietas/agregar/`,

  // Sección de Ingredientes
  INGREDIENTES: `${BASE_URL}/api/ingredientes/`,
  INGREDIENTES_AGREGAR: `${BASE_URL}/api/ingredientes/agregar/`,
  INGREDIENTES_DETALLE: (id: string) => `${BASE_URL}/api/ingredientes/${id}/`,

  // Sección de Planes Alimenticios
  PLANES_ALIMENTICIOS: `${BASE_URL}/api/planes-alimenticios/`,
  PLANES_ALIMENTICIOS_AGREGAR: `${BASE_URL}/api/planes-alimenticios/agregar/`,

  // Sección de Recetas
  RECETAS: `${BASE_URL}/api/recetas/`,
  RECETAS_AGREGAR: `${BASE_URL}/api/recetas/agregar/`,
  RECETAS_DETALLE: (id: number) => `${BASE_URL}/api/recetas/${id}/`,
  RECETAS_EDITAR: (id: number) => `${BASE_URL}/api/recetas/${id}/editar/`,
  RECETAS_ELIMINAR: (id: number) => `${BASE_URL}/api/recetas/${id}/eliminar/`,
  RECETAS_INGREDIENTES: `${BASE_URL}/api/recetas/ingredientes/`,
};
