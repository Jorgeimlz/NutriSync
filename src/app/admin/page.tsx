"use client"; // Asegúrate de que esta línea esté presente

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define el tipo para los usuarios
type User = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  first_name?: string;
  last_name?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  dietary_preference?: string;
  dietary_goal?: string;
};

// Obtener la URL base desde las variables de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/check-admin/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data.is_admin) {
          router.push('/welcome'); // Redirigir a la página de bienvenida si no es admin
        } else {
          fetchUsers();
        }
      } catch (error) {
        console.error('Error verificando el rol de administrador:', error);
        router.push('/no-access');
      }
    };

    checkAdminStatus();
  }, [router]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get<User[]>(`${API_BASE_URL}/api/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('No tienes permisos para ver esta información.');
    }
  };

  const toggleUserRole = async (userId: number, currentRole: boolean) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.patch(
        `${API_BASE_URL}/api/users/${userId}/role/`,
        { is_staff: !currentRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => (user.id === userId ? { ...user, is_staff: !currentRole } : user)));
    } catch (error) {
      console.error('Error al cambiar el rol del usuario:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Panel de Administración</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Botones de Gestión */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Gestión de Ingredientes</h2>
        <div className="flex flex-wrap">
          <button
            onClick={() => router.push('/ingredientes/lista')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
          >
            Ver Ingredientes
          </button>
          <button
            onClick={() => router.push('/ingredientes/agregar')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Agregar Ingrediente
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Gestión de Categorías</h2>
        <div className="flex flex-wrap">
          <button
            onClick={() => router.push('/categorias/lista')}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
          >
            Ver Categorías
          </button>
          <button
            onClick={() => router.push('/categorias/agregar')}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Agregar Categoría
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Gestión de Recetas</h2>
        <div className="flex flex-wrap">
          <button
            onClick={() => router.push('/recetas/lista')}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
          >
            Ver Recetas
          </button>
          <button
            onClick={() => router.push('/recetas/agregar')}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Agregar Receta
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Gestión de Dietas</h2>
        <div className="flex flex-wrap">
          <button
            onClick={() => router.push('/dieta/lista')}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
          >
            Ver Dietas
          </button>
          <button
            onClick={() => router.push('/dieta/agregar')}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Agregar Dieta
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Gestión de Planes Alimenticios</h2>
        <div className="flex flex-wrap">
          <button
            onClick={() => router.push('/planes-alimenticios/lista')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
          >
            Ver Planes Alimenticios
          </button>
          <button
            onClick={() => router.push('/planes-alimenticios/agregar')}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Agregar Plan Alimenticio
          </button>
        </div>
      </div>

      {/* Lista de Usuarios */}
      <p className="text-lg mb-4">Lista de Usuarios</p>
      <table className="table-auto border-collapse border border-gray-300 w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre de Usuario</th>
            <th className="py-3 px-6 text-left">Correo Electrónico</th>
            <th className="py-3 px-6 text-left">Rol</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {users.map(user => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.username}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">{user.is_staff ? 'Administrador' : 'Usuario'}</td>
              <td className="py-3 px-6 text-center space-x-2">
                <button
                  onClick={() => toggleUserRole(user.id, user.is_staff)}
                  className={`py-2 px-4 rounded ${user.is_staff ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
                >
                  {user.is_staff ? 'Cambiar a Usuario' : 'Cambiar a Administrador'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
