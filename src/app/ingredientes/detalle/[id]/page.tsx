"use client"; // Asegúrate de que esta línea esté presente

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { API_BASE_URL } from '../../../../config/apiConfig';

interface Ingrediente {
  id: number;
  nombre: string;
  categoria: string;
  cantidad_disponible: number;
  unidad_medida: string;
}

const DetalleIngrediente: React.FC = () => {
  const [ingrediente, setIngrediente] = useState<Ingrediente | null>(null);
  const router = useRouter();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchIngrediente = async () => {
      if (id) {
        const token = localStorage.getItem('authToken');
        try {
          const response = await axios.get<Ingrediente>(`${API_BASE_URL}/ingredientes/api/ingredientes/${id}/`, {
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

  if (!ingrediente) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Detalle de Ingrediente</h1>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <p className="text-lg font-medium">Nombre: <span className="font-normal">{ingrediente.nombre}</span></p>
        <p className="text-lg font-medium">Categoría: <span className="font-normal">{ingrediente.categoria}</span></p>
        <p className="text-lg font-medium">Cantidad Disponible: <span className="font-normal">{ingrediente.cantidad_disponible}</span></p>
        <p className="text-lg font-medium">Unidad de Medida: <span className="font-normal">{ingrediente.unidad_medida}</span></p>
        <button
          onClick={() => router.push('/ingredientes/lista')}
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 rounded-md"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default DetalleIngrediente;
