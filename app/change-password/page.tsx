'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import Sidebar from '@/components/ui/Sidebar';
import apiClient from '@/lib/apiClient';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    new_password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.patch('/users/me/password', formData);
      setMessage('Contraseña actualizada correctamente');
      setTimeout(() => router.push('/profile'), 1500);
    } catch (error) {
      console.error(error);
      setMessage('Error al actualizar la contraseña');
    }
  };

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      <Sidebar />
      <div className="flex-1 px-4 pt-4 pb-12">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-8">
          <Heading title="Cambiar Contraseña" subtitle="Actualiza tu contraseña" center />
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Contraseña actual */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña actual</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña actual"
              />
            </div>

            {/* Nueva contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
              <Input
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>

            {/* Botón para cambiar la contraseña */}
            <Button type="submit" label="Cambiar contraseña" />
          </form>
          {message && (
            <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </main>
  );
}