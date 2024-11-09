"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { API_ENDPOINTS } from '../../../../../config/apiConfig';

const EditUserPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [dietaryGoal, setDietaryGoal] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const router = useRouter();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`${API_ENDPOINTS.USERS}${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setAge(user.age);
        setGender(user.gender);
        setWeight(user.weight);
        setHeight(user.height);
        setDietaryPreference(user.dietary_preference);
        setDietaryGoal(user.dietary_goal);
        setIsStaff(user.is_staff);
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        alert('Error al cargar los detalles del usuario.');
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      await axios.patch(
        `${API_ENDPOINTS.USERS}${id}/`,
        {
          username,
          email,
          age,
          gender,
          weight,
          height,
          dietary_preference: dietaryPreference,
          dietary_goal: dietaryGoal,
          is_staff: isStaff,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Usuario actualizado correctamente');
      router.push('/admin');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar el usuario.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Usuario</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Género</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Seleccionar género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Altura (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Preferencia Dietética</label>
          <select
            value={dietaryPreference}
            onChange={(e) => setDietaryPreference(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Seleccionar preferencia</option>
            <option value="Vegan">Vegano</option>
            <option value="Vegetarian">Vegetariano</option>
            <option value="Omnivore">Omnívoro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Objetivo Dietético</label>
          <select
            value={dietaryGoal}
            onChange={(e) => setDietaryGoal(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Seleccionar objetivo</option>
            <option value="Weight Loss">Pérdida de Peso</option>
            <option value="Muscle Gain">Ganancia de Músculo</option>
            <option value="Maintenance">Mantenimiento</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <input
            type="checkbox"
            checked={isStaff}
            onChange={(e) => setIsStaff(e.target.checked)}
            className="mt-1"
          />{' '}
          Administrador
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
          >
            Actualizar Usuario
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
