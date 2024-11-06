"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../../config/apiConfig';

interface Categoria {
  id: number;
  nombre: string;
}

const ListaCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategorias = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get<Categoria[]>(`${API_BASE_URL}/categorias/api/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategorias(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Categorías</h1>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {categorias.map(categoria => (
            <tr key={categoria.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{categoria.nombre}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => router.push(`/categorias/editar/${categoria.id}`)}
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

export default ListaCategorias;
