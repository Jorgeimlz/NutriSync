// src/app/planes-alimenticios/lista/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/apiConfig';

type PlanAlimenticio = {
    id: number;
    nombre: string;
    descripcion: string;
};

const ListaPlanesAlimenticios: React.FC = () => {
    const [planes, setPlanes] = useState<PlanAlimenticio[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlanes = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get(API_ENDPOINTS.PLANES_ALIMENTICIOS, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPlanes(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener planes alimenticios:', error);
            }
        };

        fetchPlanes();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Planes Alimenticios</h1>
            <ul>
                {planes.map((plan) => (
                    <li key={plan.id} className="border p-2 mb-2 bg-white shadow-md rounded">
                        <h2 className="font-semibold">{plan.nombre}</h2>
                        <p>{plan.descripcion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaPlanesAlimenticios;

