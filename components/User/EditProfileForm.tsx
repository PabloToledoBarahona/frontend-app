'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { LocationSelector } from '@/components/User/LocationSelector';
import { ToastSuccess } from '@/components/ui/ToastSuccess';
import apiClient from '@/lib/apiClient';
import { signUpSchema } from '@/lib/validationSchemas';
import { z } from 'zod';


interface FormData {
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  bio: string;
  phone_number: string;
  location: {
    country_id: string;
    state_id: string;
    city_id: string;
  };
}

export function EditProfileForm() {
    const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    bio: '',
    phone_number: '',
    location: { country_id: '', state_id: '', city_id: '' },
  });

  const [errors, setErrors] = useState<Record<string, any>>({});
  const [message, setMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
const [successMessage, setSuccessMessage] = useState(''); 


  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await apiClient.get('/users/me');
        const user = res.data.data.user;

        setFormData({
          username: user.username || '',
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          date_of_birth: user.date_of_birth?.split('T')[0] || '',
          gender: user.gender || '',
          bio: user.bio || '',
          phone_number: user.phone_number || '',
          location: {
            country_id: user.location?.country_id || '',
            state_id: user.location?.state_id || '',
            city_id: user.location?.city_id || '',
          },
        });
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    }

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signUpSchema.parse(formData);
      await apiClient.patch('/users/me', formData);
  
      setSuccessMessage('Perfil actualizado exitosamente.');
      setToastOpen(true);
  
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
  
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: any = {};
        err.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message;
        });
        setErrors(newErrors);
      } else {
        setMessage('Hubo un error al actualizar tu perfil.');
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto mt-8">
      <Heading title="Editar Perfil" subtitle="Modifica tu información personal" center />

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <Input
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="first_name"
            placeholder="Nombre"
            value={formData.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />
          <Input
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            error={errors.last_name}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleChange}
            error={errors.date_of_birth}
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-gray-800"
          >
            <option value="">Selecciona un género</option>
            <option value="Female">Femenino</option>
            <option value="Male">Masculino</option>
            <option value="Other">Otro</option>
          </select>
        </div>

        <Input
          name="phone_number"
          placeholder="Número de teléfono"
          value={formData.phone_number}
          onChange={handleChange}
          error={errors.phone_number}
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Biografía"
          className="w-full p-3 border rounded-lg text-gray-800 placeholder-gray-400"
        />

        {/* Selector de País/Estado/Ciudad */}
        <LocationSelector location={formData.location} onChange={handleLocationChange} errors={errors.location} />

        <Button type="submit" label="Guardar cambios" className="mt-6" />

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}