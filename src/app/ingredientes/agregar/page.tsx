"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '../../../config/apiConfig';

// Definir el tipo de las categorías
type Categoria = {
  id: number;
  nombre: string;
};

const AgregarIngrediente: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [cantidadDisponible, setCantidadDisponible] = useState(0);
  const [unidadMedida, setUnidadMedida] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.CATEGORIAS);
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      await axios.post(
        API_ENDPOINTS.INGREDIENTES_AGREGAR,
        { nombre, cantidad_disponible: cantidadDisponible, unidad_medida: unidadMedida, categoria },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/ingredientes/lista');
    } catch (error) {
      console.error('Error al agregar ingrediente:', error);
      alert('Error al agregar ingrediente. Verifica tus credenciales.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Agregar Ingrediente</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre del ingrediente
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del ingrediente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidadDisponible">
            Cantidad disponible
          </label>
          <input
            id="cantidadDisponible"
            type="number"
            placeholder="Cantidad disponible"
            value={cantidadDisponible}
            onChange={(e) => setCantidadDisponible(Number(e.target.value))}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidadMedida">
            Unidad de medida
          </label>
          <input
            id="unidadMedida"
            type="text"
            placeholder="Unidad de medida"
            value={unidadMedida}
            onChange={(e) => setUnidadMedida(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
            Categoría
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Ingrediente
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarIngrediente;


