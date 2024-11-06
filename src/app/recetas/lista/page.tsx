"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/apiConfig'; // Importa la configuración de API

type Receta = {
    id: number;
    nombre: string;
    descripcion: string;
};

const ListaRecetas: React.FC = () => {
    const [recetas, setRecetas] = useState<Receta[]>([]);

    useEffect(() => {
        const fetchRecetas = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/recetas/`, { // Usa la URL de la API
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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Recetas</h1>
            <ul>
                {recetas.map((receta) => (
                    <li key={receta.id} className="border p-2 mb-2">
                        <h2 className="font-semibold">{receta.nombre}</h2>
                        <p>{receta.descripcion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaRecetas;
