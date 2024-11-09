// NutriSync/frontend/src/components/RegisterForm.tsx
"use client";

import React, { useState } from 'react';
import FormInput from './FormInput';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    age: '',
    gender: 'M',
    weight: '',
    height: '',
    dietary_preference: 'Omnivore',
    dietary_goal: 'Maintenance',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Endpoint de registro
      const response = await axios.post(API_ENDPOINTS.REGISTER, formData);
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro de Usuario</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Nombre de Usuario" type="text" name="username" value={formData.username} onChange={handleChange} />
        <FormInput label="Correo Electrónico" type="email" name="email" value={formData.email} onChange={handleChange} />

        <FormInput label="Nombre" type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        <FormInput label="Apellido" type="text" name="last_name" value={formData.last_name} onChange={handleChange} />

        <FormInput label="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} />
        <FormInput label="Edad" type="number" name="age" value={formData.age} onChange={handleChange} />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Género
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>

        <FormInput label="Peso (kg)" type="number" name="weight" value={formData.weight} onChange={handleChange} />
        <FormInput label="Altura (cm)" type="number" name="height" value={formData.height} onChange={handleChange} />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dietary_preference">
            Preferencia Dietética
          </label>
          <select
            id="dietary_preference"
            name="dietary_preference"
            value={formData.dietary_preference}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Vegan">Vegano</option>
            <option value="Vegetarian">Vegetariano</option>
            <option value="Omnivore">Omnívoro</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dietary_goal">
            Objetivo Alimenticio
          </label>
          <select
            id="dietary_goal"
            name="dietary_goal"
            value={formData.dietary_goal}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Weight Loss">Pérdida de Peso</option>
            <option value="Muscle Gain">Ganancia Muscular</option>
            <option value="Maintenance">Mantenimiento</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
