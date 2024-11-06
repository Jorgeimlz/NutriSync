"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Ingrediente = {
    id: number;   // ID del ingrediente
    nombre: string; // Nombre del ingrediente
};

const AgregarReceta: React.FC = () => {
    const [ingredientes, setIngredientes] = useState<string[]>([]); // IDs de los ingredientes
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [tiempoPreparacion, setTiempoPreparacion] = useState(0);
    const [allIngredientes, setAllIngredientes] = useState<Ingrediente[]>([]);

    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/recetas/ingredientes/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}` // Asegúrate de que el token esté aquí
                    },
                });
                setAllIngredientes(response.data);
            } catch (error) {
                console.error('Error al obtener ingredientes:', error);
            }
        };

        fetchIngredientes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/recetas/agregar/', {
                nombre,
                descripcion,
                ingredientes, // Aquí envías el array de IDs de ingredientes como string[]
                instrucciones,
                tiempo_preparacion: tiempoPreparacion,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}` // Asegúrate de incluir el token aquí también
                },
            });
            console.log('Receta agregada:', response.data);
        } catch (error) {
            console.error('Error al agregar receta:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Agregar Receta</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre de la receta
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la receta"
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
                        placeholder="Descripción de la receta"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instrucciones">
                        Instrucciones
                    </label>
                    <textarea
                        id="instrucciones"
                        placeholder="Instrucciones de preparación"
                        value={instrucciones}
                        onChange={(e) => setInstrucciones(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiempoPreparacion">
                        Tiempo de preparación (minutos)
                    </label>
                    <input
                        id="tiempoPreparacion"
                        type="number"
                        placeholder="Tiempo de preparación"
                        value={tiempoPreparacion}
                        onChange={(e) => setTiempoPreparacion(Number(e.target.value))}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredientes">
                        Ingredientes
                    </label>
                    <select
                        id="ingredientes"
                        multiple
                        value={ingredientes}
                        onChange={(e) => {
                            const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                            setIngredientes(selectedValues);
                        }}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {allIngredientes.map((ing) => (
                            <option key={ing.id} value={ing.id.toString()}>
                                {ing.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Agregar Receta
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarReceta;
