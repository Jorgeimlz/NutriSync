"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/config/apiConfig'; // Asegúrate de que la ruta sea correcta

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/token/`, {
        username: formData.username,
        password: formData.password,
      });

      const token = response.data.access; // Obtén el token
      localStorage.setItem('authToken', token); // Almacena el token

      // Verifica si el usuario es administrador
      const adminResponse = await axios.get(`${API_BASE_URL}/api/users/check-admin/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (adminResponse.data.is_admin) {
        router.push('/admin'); // Redirige a la página de administración
      } else {
        router.push('/welcome'); // Redirige a la página de bienvenida
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert("Credenciales inválidas");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Nombre de Usuario
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
