"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const WelcomePage: React.FC = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('authToken'); // Elimina el token de autenticación
    router.push('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a NutriSync</h1>
      <p className="text-lg mb-4">Esta es tu página de bienvenida.</p>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default WelcomePage;
