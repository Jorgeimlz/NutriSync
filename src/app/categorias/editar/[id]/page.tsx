"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const EditarCategoria: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const router = useRouter();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchCategoria = async () => {
      if (id) {
        const token = localStorage.getItem('authToken');
        try {
          const response = await axios.get(`http://127.0.0.1:8000/categorias/api/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNombre(response.data.nombre);
        } catch (error) {
          console.error('Error al obtener categoría:', error);
          alert('Error al cargar los detalles de la categoría.');
        }
      }
    };

    fetchCategoria();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      await axios.put(`http://127.0.0.1:8000/categorias/api/${id}/`, {
        nombre,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      router.push('/categorias/lista');
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      alert('Error al actualizar la categoría.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Categoría</h1>
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
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
        >
          Actualizar
        </button>
        <button
          type="button"
          onClick={() => router.push('/categorias/lista')}
          className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 rounded-md"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarCategoria;
