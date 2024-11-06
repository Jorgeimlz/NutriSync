"use client";

import React from 'react';

const NoAccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Acceso Denegado</h1>
      <p className="text-lg">No tienes permisos para acceder a esta página.</p>
    </div>
  );
};

export default NoAccessPage;
