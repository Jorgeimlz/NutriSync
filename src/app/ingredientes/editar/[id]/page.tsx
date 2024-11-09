"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { API_ENDPOINTS } from '../../../../config/apiConfig';

const EditarIngrediente: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [cantidadDisponible, setCantidadDisponible] = useState(0);
  const [unidadMedida, setUnidadMedida] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const router = useRouter();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.CATEGORIAS);
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    const fetchIngrediente = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(API_ENDPOINTS.INGREDIENTES_DETALLE(id), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { nombre, cantidad_disponible, unidad_medida, categoria } = response.data;
        setNombre(nombre);
        setCantidadDisponible(cantidad_disponible);
        setUnidadMedida(unidad_medida);
        setCategoria(categoria);
      } catch (error) {
        console.error('Error al obtener ingrediente:', error);
        alert('Error al cargar los detalles del ingrediente.');
      }
    };

    fetchCategorias();
    fetchIngrediente();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      await axios.put(
        API_ENDPOINTS.INGREDIENTES_DETALLE(id),
        { nombre, cantidad_disponible: cantidadDisponible, unidad_medida: unidadMedida, categoria },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/ingredientes/lista');
    } catch (error) {
      console.error('Error al actualizar ingrediente:', error);
      alert('Error al actualizar el ingrediente.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Ingrediente</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cantidad Disponible</label>
          <input
            type="number"
            value={cantidadDisponible}
            onChange={(e) => setCantidadDisponible(Number(e.target.value))}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
          <input
            type="text"
            value={unidadMedida}
            onChange={(e) => setUnidadMedida(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>Seleccionar categoría</option>
            {categorias.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarIngrediente;
