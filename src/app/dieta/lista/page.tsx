// src/app/dieta/lista/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/apiConfig';

type Dieta = {
    id: number;
    nombre: string;
    descripcion: string;
    tipo: string;
};

const ListaDietas: React.FC = () => {
    const [dietas, setDietas] = useState<Dieta[]>([]);

    useEffect(() => {
        const fetchDietas = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/dietas/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    },
                });
                setDietas(response.data);
            } catch (error) {
                console.error('Error al obtener dietas:', error);
            }
        };

        fetchDietas();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Dietas</h1>
            <ul>
                {dietas.map((dieta) => (
                    <li key={dieta.id} className="border p-2 mb-2">
                        <h2 className="font-semibold">{dieta.nombre}</h2>
                        <p>{dieta.descripcion}</p>
                        <p><strong>Tipo:</strong> {dieta.tipo}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaDietas;
