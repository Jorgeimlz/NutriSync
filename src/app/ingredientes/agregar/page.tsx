// src/app/ingredientes/agregar/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Categoria = {
    id: number;   // ID de la categoría
    nombre: string; // Nombre de la categoría
};

const AgregarIngrediente: React.FC = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [nombre, setNombre] = useState('');
    const [cantidadDisponible, setCantidadDisponible] = useState(0);
    const [unidadMedida, setUnidadMedida] = useState('');
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        const fetchCategorias = async () => {
            const token = localStorage.getItem('authToken'); // Asegúrate de que el token está aquí
            if (!token) {
                console.error('No se encontró el token de autenticación.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/categorias/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Envía el token en la cabecera
                    },
                });
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken'); // Asegúrate de que el token está aquí
        if (!token) {
            console.error('No se encontró el token de autenticación al enviar el formulario.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/ingredientes/agregar/', {
                nombre,
                cantidad_disponible: cantidadDisponible,
                unidad_medida: unidadMedida,
                categoria,  // Aquí envías el ID de la categoría seleccionada
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Envía el token en la cabecera
                },
            });
            console.log('Ingrediente agregado:', response.data);
            // Resetear el formulario si es necesario
        } catch (error) {
            console.error('Error al agregar ingrediente:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Agregar Ingrediente</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre del ingrediente
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre del ingrediente"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidadDisponible">
                        Cantidad disponible
                    </label>
                    <input
                        id="cantidadDisponible"
                        type="number"
                        placeholder="Cantidad disponible"
                        value={cantidadDisponible}
                        onChange={(e) => setCantidadDisponible(Number(e.target.value))}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidadMedida">
                        Unidad de medida
                    </label>
                    <input
                        id="unidadMedida"
                        type="text"
                        placeholder="Unidad de medida"
                        value={unidadMedida}
                        onChange={(e) => setUnidadMedida(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
                        Categoría
                    </label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="" disabled>Seleccionar categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Agregar Ingrediente
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarIngrediente;
