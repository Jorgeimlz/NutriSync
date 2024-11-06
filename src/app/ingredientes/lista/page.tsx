"use client"; // Asegúrate de que esta línea esté presente

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Ingrediente {
  id: number;
  nombre: string;
  categoria: string;
  cantidad_disponible: number;
  unidad_medida: string;
}

const ListaIngredientes: React.FC = () => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchIngredientes = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get<Ingrediente[]>('http://127.0.0.1:8000/ingredientes/api/ingredientes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIngredientes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar ingredientes:', error);
        alert('No tienes permisos para ver esta información.');
      }
    };

    fetchIngredientes();
  }, []);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Ingredientes</h1>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Categoría</th>
            <th className="py-3 px-6 text-left">Cantidad Disponible</th>
            <th className="py-3 px-6 text-left">Unidad de Medida</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {ingredientes.map(ingrediente => (
            <tr key={ingrediente.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{ingrediente.nombre}</td>
              <td className="py-3 px-6 text-left">{ingrediente.categoria}</td>
              <td className="py-3 px-6 text-left">{ingrediente.cantidad_disponible}</td>
              <td className="py-3 px-6 text-left">{ingrediente.unidad_medida}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => router.push(`/ingredientes/editar/${ingrediente.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => alert('Funcionalidad de eliminar')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaIngredientes;
