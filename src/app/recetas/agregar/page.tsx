"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/config/apiConfig';  // Asegúrate de importar los endpoints correctamente

type Ingrediente = {
    id: number; // ID del ingrediente
    nombre: string; // Nombre del ingrediente
};

const AgregarReceta: React.FC = () => {
    const [ingredientes, setIngredientes] = useState<number[]>([]); // IDs de los ingredientes seleccionados
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [tiempoPreparacion, setTiempoPreparacion] = useState(0);
    const [allIngredientes, setAllIngredientes] = useState<Ingrediente[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.RECETAS_INGREDIENTES, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
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
            const response = await axios.post(API_ENDPOINTS.RECETAS_AGREGAR, {
                nombre,
                descripcion,
                ingredientes, // Envío de IDs de ingredientes seleccionados
                instrucciones,
                tiempo_preparacion: tiempoPreparacion,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            });
            console.log('Receta agregada:', response.data);
            router.push('/recetas/lista'); // Redirige a la lista de recetas después de agregar
        } catch (error) {
            console.error('Error al agregar receta:', error);
        }
    };

    const handleIngredientChange = (id: number) => {
        setIngredientes(prevIngredientes =>
            prevIngredientes.includes(id)
                ? prevIngredientes.filter(ing => ing !== id) // Elimina el ingrediente si ya está seleccionado
                : [...prevIngredientes, id] // Agrega el ingrediente si no está seleccionado
        );
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
                    <div className="grid grid-cols-2 gap-2">
                        {allIngredientes.map((ingrediente) => (
                            <div key={ingrediente.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={ingredientes.includes(ingrediente.id)}
                                    onChange={() => handleIngredientChange(ingrediente.id)}
                                    className="mr-2"
                                />
                                <label>{ingrediente.nombre}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Agregar Receta
                    </button>
                    <button
                        onClick={() => router.push('/admin')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Volver al Menú
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarReceta;
