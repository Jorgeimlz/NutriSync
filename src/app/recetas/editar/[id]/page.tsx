"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { API_ENDPOINTS } from '@/config/apiConfig';  // Asegúrate de importar los endpoints correctamente

type Ingrediente = {
    id: number;
    nombre: string;
};

const EditarReceta: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [tiempoPreparacion, setTiempoPreparacion] = useState(0);
    const [ingredientes, setIngredientes] = useState<number[]>([]);
    const [allIngredientes, setAllIngredientes] = useState<Ingrediente[]>([]);
    const router = useRouter();
    const { id } = useParams() as { id: string }; // 'id' es de tipo string por defecto

    useEffect(() => {
        const fetchReceta = async () => {
            const token = localStorage.getItem('authToken');
            try {
                // Convertir el id de string a number antes de pasarlo a la URL
                const response = await axios.get(`${API_ENDPOINTS.RECETAS_DETALLE(Number(id))}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const receta = response.data;
                setNombre(receta.nombre);
                setDescripcion(receta.descripcion);
                setInstrucciones(receta.instrucciones);
                setTiempoPreparacion(receta.tiempo_preparacion);
                setIngredientes(receta.ingredientes);
            } catch (error) {
                console.error('Error al obtener receta:', error);
            }
        };

        const fetchIngredientes = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get(API_ENDPOINTS.RECETAS_INGREDIENTES, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllIngredientes(response.data);
            } catch (error) {
                console.error('Error al obtener ingredientes:', error);
            }
        };

        if (id) {
            fetchReceta();
            fetchIngredientes();
        }
    }, [id]);

    const handleIngredientChange = (id: number) => {
        setIngredientes((prev) =>
            prev.includes(id) ? prev.filter((ing) => ing !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        try {
            await axios.put(
                `${API_ENDPOINTS.RECETAS_EDITAR(Number(id))}`, // Convertir el id a number antes de pasarlo
                {
                    nombre,
                    descripcion,
                    instrucciones,
                    tiempo_preparacion: tiempoPreparacion,
                    ingredientes,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            router.push('/recetas/lista');
        } catch (error) {
            console.error('Error al actualizar la receta:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Editar Receta</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre de la receta
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="instrucciones" className="block text-gray-700 text-sm font-bold mb-2">
                        Instrucciones
                    </label>
                    <textarea
                        id="instrucciones"
                        value={instrucciones}
                        onChange={(e) => setInstrucciones(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tiempoPreparacion" className="block text-gray-700 text-sm font-bold mb-2">
                        Tiempo de preparación (minutos)
                    </label>
                    <input
                        id="tiempoPreparacion"
                        type="number"
                        value={tiempoPreparacion}
                        onChange={(e) => setTiempoPreparacion(Number(e.target.value))}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Ingredientes</label>
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        onClick={() => router.push('/recetas/lista')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarReceta;
