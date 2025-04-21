"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import Sidebar from '@/components/ui/Sidebar';
import apiClient from '@/lib/apiClient';
import { signUpSchema } from '@/lib/validationSchemas';
import { z } from 'zod';

interface Location {
  country_id: string;
  state_id: string;
  city_id: string;
}

interface FormData {
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  bio: string;
  phone_number: string;
  location: Location;
}

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    bio: '',
    phone_number: '',
    location: {
      country_id: '',
      state_id: '',
      city_id: '',
    }
  });
  const [message, setMessage] = useState('');
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
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
          location: user.location || { country_id: '', state_id: '', city_id: '' },
        });

        const countriesRes = await apiClient.get('/location/countries');
        setCountries(countriesRes.data.data);

        if (user.location?.country_id) {
          const statesRes = await apiClient.get(`/location/states/${user.location.country_id}`);
          setStates(statesRes.data.data);
        }

        if (user.location?.state_id) {
          const citiesRes = await apiClient.get(`/location/cities/${user.location.state_id}`);
          setCities(citiesRes.data.data);
        }
      } catch (err) {
        console.error(err);
        setMessage('Error al obtener los datos del perfil');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('location')) {
      const key = name.split('.')[1] as keyof Location;

      if (key === 'country_id') {
        setFormData((prev) => ({
          ...prev,
          location: {
            country_id: value,
            state_id: '',
            city_id: '',
          },
        }));
        apiClient.get(`/location/states/${value}`)
          .then((response) => setStates(response.data.data))
          .catch(() => setStates([]));
        setCities([]);
      }

      if (key === 'state_id') {
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            state_id: value,
            city_id: '',
          },
        }));
        apiClient.get(`/location/cities/${value}`)
          .then((response) => setCities(response.data.data))
          .catch(() => setCities([]));
      }

      if (key === 'city_id') {
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            city_id: value,
          },
        }));
      }

    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signUpSchema.parse(formData);
      await apiClient.patch('/users/me', formData);
      setMessage('Perfil actualizado exitosamente');
      setTimeout(() => router.push('/profile'), 1500);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: any = {};
        err.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message;
        });
        setErrors(newErrors);
      } else {
        setMessage('Hubo un error al actualizar tu perfil');
      }
    }
  };

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      <Sidebar />
      <div className="flex-1 px-4 pt-4 pb-12">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-8">
          <Heading title="Editar Perfil" subtitle="Modifica tus datos personales" center />
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
              <Input name="username" value={formData.username} onChange={handleChange} placeholder="Nombre de usuario" />
              {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <Input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Nombre" />
              {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <Input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Apellido" />
              {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
              <Input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
              {errors.date_of_birth && <p className="text-red-500 text-xs">{errors.date_of_birth}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Género</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="">Selecciona un género</option>
                <option value="Female">Femenino</option>
                <option value="Male">Masculino</option>
                <option value="Other">Otro</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de teléfono</label>
              <Input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Número de teléfono" />
              {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Biografía</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Biografía"
                className="w-full p-2 border rounded-lg resize-none"
                rows={4}
              />
              {errors.bio && <p className="text-red-500 text-xs">{errors.bio}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">País</label>
              <select
                name="location.country_id"
                value={formData.location.country_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecciona un país</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>{country.name}</option>
                ))}
              </select>
              {errors.location?.country_id && <p className="text-red-500 text-xs">{errors.location?.country_id}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                name="location.state_id"
                value={formData.location.state_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecciona un estado</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>{state.name}</option>
                ))}
              </select>
              {errors.location?.state_id && <p className="text-red-500 text-xs">{errors.location?.state_id}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ciudad</label>
              <select
                name="location.city_id"
                value={formData.location.city_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecciona una ciudad</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>{city.name}</option>
                ))}
              </select>
              {errors.location?.city_id && <p className="text-red-500 text-xs">{errors.location?.city_id}</p>}
            </div>
            <Button type="submit" label="Guardar cambios" />
          </form>
          {message && (
            <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </main>
  );
}
