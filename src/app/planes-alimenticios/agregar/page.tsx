"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../../config/apiConfig'; // Importa la configuración de API

type Dieta = {
    id: number;
    nombre: string;
};

const AgregarPlanAlimenticio: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dietas, setDietas] = useState<Dieta[]>([]);
    const [selectedDieta, setSelectedDieta] = useState<number | null>(null);
    const [fechaInicio, setFechaInicio] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchDietas = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get(`${API_BASE_URL}/dietas/`, { // Usa la URL de la API
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDietas(response.data);
            } catch (error) {
                console.error('Error al obtener dietas:', error);
            }
        };

        fetchDietas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(`${API_BASE_URL}/planes-alimenticios/agregar/`, { // Usa la URL de la API
                nombre,
                descripcion,
                dieta: selectedDieta,
                fecha_inicio: fechaInicio,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push('/planes-alimenticios/lista');
        } catch (error) {
            console.error('Error al agregar plan alimenticio:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Agregar Plan Alimenticio</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre del Plan
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre del plan"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        placeholder="Descripción del plan"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dieta">
                        Selecciona una Dieta
                    </label>
                    <select
                        id="dieta"
                        value={selectedDieta || ''}
                        onChange={(e) => setSelectedDieta(Number(e.target.value))}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Seleccione una dieta</option>
                        {dietas.map((dieta) => (
                            <option key={dieta.id} value={dieta.id}>
                                {dieta.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_inicio">
                        Fecha de Inicio
                    </label>
                    <input
                        id="fecha_inicio"
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Agregar Plan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarPlanAlimenticio;
