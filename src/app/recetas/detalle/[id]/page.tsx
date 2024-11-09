"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/config/apiConfig';  // Asegúrate de importar los endpoints correctamente

type Ingrediente = {
    id: number;
    nombre: string;
    categoria: number;
    cantidad_disponible: number;
    unidad_medida: string;
    descripcion: string;
};

type Receta = {
    id: number;
    nombre: string;
    descripcion: string;
    instrucciones: string;
    tiempo_preparacion: number;
    ingredientes_detail: Ingrediente[]; // Para mostrar detalles completos de ingredientes
};

const DetalleReceta: React.FC = () => {
    const [receta, setReceta] = useState<Receta | null>(null);
    const { id } = useParams(); // 'id' es de tipo string por defecto
    const router = useRouter();

    useEffect(() => {
        const fetchReceta = async () => {
            const token = localStorage.getItem('authToken');
            try {
                // Convierte el id de string a number antes de pasarlo a la URL
                const response = await axios.get(`${API_ENDPOINTS.RECETAS_DETALLE(Number(id))}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReceta(response.data);
            } catch (error) {
                console.error('Error al obtener receta:', error);
            }
        };

        if (id) {
            fetchReceta();
        }
    }, [id]);

    if (!receta) return <div>Cargando...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">{receta.nombre}</h1>
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <p><strong>Descripción:</strong> {receta.descripcion}</p>
                <p><strong>Instrucciones:</strong> {receta.instrucciones}</p>
                <p><strong>Tiempo de Preparación:</strong> {receta.tiempo_preparacion} minutos</p>
                
                <p><strong>Ingredientes:</strong></p>
                <ul>
                    {receta.ingredientes_detail.map((ing: Ingrediente) => (
                        <li key={ing.id}>{ing.nombre} - {ing.cantidad_disponible} {ing.unidad_medida}</li>
                    ))}
                </ul>

                <button
                    onClick={() => router.push('/recetas/lista')}
                    className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 rounded-md"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default DetalleReceta;
