"use client"; // Asegúrate de que esta línea esté presente

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const unidadesDeMedida = [
  "Kilogramos",
  "Gramos",
  "Litros",
  "Mililitros",
  "Tazas",
  "Cucharadas",
  "Cucharaditas",
  "Piezas",
  "Unidades"
];

interface Ingrediente {
  id: number;
  nombre: string;
  categoria: string;
  cantidad_disponible: number;
  unidad_medida: string;
}

const EditarIngrediente: React.FC = () => {
  const [ingrediente, setIngrediente] = useState<Ingrediente | null>(null);
  const router = useRouter();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchIngrediente = async () => {
      if (id) {
        const token = localStorage.getItem('authToken');
        try {
          const response = await axios.get<Ingrediente>(`http://127.0.0.1:8000/ingredientes/api/ingredientes/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIngrediente(response.data);
        } catch (error) {
          console.error('Error al obtener ingrediente:', error);
          alert('Error al cargar los detalles del ingrediente.');
        }
      }
    };

    fetchIngrediente();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!ingrediente) return;

    try {
      await axios.put(`http://127.0.0.1:8000/ingredientes/api/ingredientes/${id}/`, ingrediente, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/ingredientes/lista');
    } catch (error) {
      console.error('Error al actualizar ingrediente:', error);
      alert('Error al actualizar el ingrediente.');
    }
  };

  if (!ingrediente) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Ingrediente</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={ingrediente.nombre}
            onChange={(e) => setIngrediente({ ...ingrediente, nombre: e.target.value })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <input
            type="text"
            value={ingrediente.categoria}
            onChange={(e) => setIngrediente({ ...ingrediente, categoria: e.target.value })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cantidad Disponible</label>
          <input
            type="number"
            value={ingrediente.cantidad_disponible}
            onChange={(e) => setIngrediente({ ...ingrediente, cantidad_disponible: Number(e.target.value) })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>

      <select

        value={ingrediente.unidad_medida}
        onChange={(e) => setIngrediente({ ...ingrediente, unidad_medida: e.target.value })}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      >
        {unidadesDeMedida.map((unidad) => (
          <option key={unidad} value={unidad}>{unidad}</option>
        ))}
      </select>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
    >
      Actualizar
    </button>
    <button
      type="button"
      onClick={() => router.push('/ingredientes/lista')}
      className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 rounded-md"
    >
      Cancelar
    </button>
  </form>
</div>
); };

export default EditarIngrediente;