"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/config/apiConfig';  // Asegúrate de importar los endpoints correctamente

type Receta = {
    id: number;
    nombre: string;
    descripcion: string;
};

const ListaRecetas: React.FC = () => {
    const [recetas, setRecetas] = useState<Receta[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchRecetas = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.RECETAS, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    },
                });
                setRecetas(response.data);
            } catch (error) {
                console.error('Error al obtener recetas:', error);
            }
        };

        fetchRecetas();
    }, []);

    const deleteReceta = async (recetaId: number) => {
        const confirmed = confirm('¿Estás seguro de que deseas eliminar esta receta?');
        if (!confirmed) return;

        try {
            await axios.delete(API_ENDPOINTS.RECETAS_ELIMINAR(recetaId), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            });
            setRecetas(recetas.filter(receta => receta.id !== recetaId));
            alert('Receta eliminada correctamente.');
        } catch (error) {
            console.error('Error al eliminar receta:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Recetas</h1>
            <ul>
                {recetas.map((receta) => (
                    <li key={receta.id} className="border p-4 mb-4 rounded shadow">
                        <h2 className="font-semibold text-lg">{receta.nombre}</h2>
                        <p>{receta.descripcion}</p>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => router.push(`/recetas/detalle/${receta.id}`)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Ver Detalles
                            </button>
                            <button
                                onClick={() => router.push(`/recetas/editar/${receta.id}`)}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => deleteReceta(receta.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => router.push('/admin')} className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Volver al Menú
            </button>
        </div>
    );
};

export default ListaRecetas;
