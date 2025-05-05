'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import Sidebar from '@/components/ui/Sidebar';
import apiClient from '@/lib/apiClient';

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    bio: '',
    phone_number: '',
    email: '',
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
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

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
          email: user.email || '',
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
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'location.country_id') {
      apiClient.get(`/location/states/${value}`)
        .then((response) => setStates(response.data.data));
    }

    if (name === 'location.state_id') {
      apiClient.get(`/location/cities/${value}`)
        .then((response) => setCities(response.data.data));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.patch('/users/me', formData);
      setMessage('Perfil actualizado exitosamente');
      setTimeout(() => router.push('/profile'), 1500);
    } catch (error) {
      console.error(error);
      setMessage('Hubo un error al actualizar tu perfil');
    }
  };

  const handleEmailChange = async () => {
    try {
      const res = await apiClient.post('/users/me/email', {
        password,
        new_email: newEmail,
      });
      if (res.status === 200) {
        setMessage('Te hemos enviado un OTP a tu nuevo correo.');
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al actualizar el correo electrónico');
    }
  };

  const handleOtpVerification = async () => {
    try {
      const res = await apiClient.post('/users/me/email/confirm', {
        otp,
        new_email: newEmail,
      });

      if (res.status === 200) {
        setMessage('Correo electrónico verificado y actualizado correctamente');
        setTimeout(() => router.push('/profile'), 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al verificar el OTP');
    }
  };

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      <Sidebar />
      <div className="flex-1 px-4 pt-4 pb-12">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-8">
          <Heading title="Editar Perfil" subtitle="Modifica tus datos personales" center />
          <form className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nuevo correo electrónico</label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Nuevo correo electrónico"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>

            {isOtpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Ingresa el OTP enviado</label>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Código OTP"
                />
              </div>
            )}

            <Button
              type="button"
              label={isOtpSent ? "Verificar OTP" : "Cambiar correo"}
              onClick={isOtpSent ? handleOtpVerification : handleEmailChange}
            />
          </form>

          {message && (
            <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </main>
  );
}