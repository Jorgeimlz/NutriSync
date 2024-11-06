"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Controla la carga de la página
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        // Si no hay token, redirige al login
        router.push('/login');
        return;
      }

      try {
        // Verifica si el usuario es administrador
        const response = await axios.get('http://localhost:8000/api/users/check-admin/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data.is_admin) {
          // Si el usuario no es administrador, redirige a no-access
          router.push('/no-access');
        } else {
          setIsLoading(false); // Usuario es administrador, muestra la página
          fetchUsers(); // Carga los usuarios
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
      const response = await axios.get<User[]>('http://localhost:8000/api/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('No tienes permisos para ver esta información.');
    }
  };

  const toggleUserRole = async (userId: number, currentRole: boolean) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.patch(
        `http://localhost:8000/api/users/${userId}/role/`,
        { is_staff: !currentRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
                  className={`py-2 px-4 rounded ${
                    user.is_staff ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
                  } text-white`}
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
