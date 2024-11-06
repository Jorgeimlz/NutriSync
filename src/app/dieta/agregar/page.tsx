// src/app/dieta/agregar/page.tsx

"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/apiConfig';

const AgregarDieta: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/dietas/agregar/`, {
                nombre,
                descripcion,
                tipo,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            });
            console.log('Dieta agregada:', response.data);
            // Resetear el formulario
            setNombre('');
            setDescripcion('');
            setTipo('');
        } catch (error) {
            console.error('Error al agregar dieta:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Agregar Dieta</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre de la dieta
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la dieta"
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
                        placeholder="Descripción de la dieta"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo">
                        Tipo de dieta
                    </label>
                    <input
                        id="tipo"
                        type="text"
                        placeholder="Tipo de dieta (ej: vegana, vegetariana)"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Agregar Dieta
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarDieta;
