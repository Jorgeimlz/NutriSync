"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '../../../config/apiConfig';

const AgregarCategoria: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      await axios.post(
        API_ENDPOINTS.CATEGORIAS_CREAR,
        { nombre },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      router.push('/categorias/lista');
    } catch (error) {
      console.error('Error al agregar categoría:', error);
      alert('Error al agregar categoría. Verifica tus credenciales.');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Agregar Categoría</h1>
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
          Agregar
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

export default AgregarCategoria;
