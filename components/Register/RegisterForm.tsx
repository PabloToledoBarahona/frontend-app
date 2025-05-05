'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import apiClient from '@/lib/apiClient';

import UserFields from './UserFields';
import PersonalInfo from './PersonalInfo';
import BioField from './BioField';
import LocationSelector from './LocationSelector';
import PasswordFields from './PasswordFields';
import RegisterFooter from './RegisterFooter';

type User = {
  username?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  date_of_birth?: string;
  gender?: string;
  bio?: string;
  country_id?: string;
  state_id?: string;
  city_id?: string;
};

export default function RegisterForm() {
  const router = useRouter();

  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [formData, setFormData] = useState<User>({
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    date_of_birth: '',
    gender: '',
    bio: '',
    country_id: '',
    state_id: '',
    city_id: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiClient.get('/location/countries').then((res) => {
      setCountries(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (!formData.country_id) return;
    apiClient.get(`/location/states/${formData.country_id}`).then((res) => {
      setStates(res.data.data);
      setCities([]);
      setFormData((prev) => ({ ...prev, state_id: '', city_id: '' }));
    });
  }, [formData.country_id]);

  useEffect(() => {
    if (!formData.state_id) return;
    apiClient.get(`/location/cities/${formData.state_id}`).then((res) => {
      setCities(res.data.data);
      setFormData((prev) => ({ ...prev, city_id: '' }));
    });
  }, [formData.state_id]);

  const validate = () => {
    const newErrors: Partial<Record<keyof User, string>> = {};

    if (!formData.username) newErrors.username = 'Campo requerido';
    if (!formData.first_name) newErrors.first_name = 'Campo requerido';
    if (!formData.last_name) newErrors.last_name = 'Campo requerido';
    if (!formData.phone_number || !/^\d{7,15}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Teléfono inválido (solo números)';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    }
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Campo requerido';
    if (!formData.gender) newErrors.gender = 'Campo requerido';
    if (!formData.city_id) newErrors.city_id = 'Campo requerido';
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Debe incluir una mayúscula';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Debe incluir una minúscula';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Debe incluir un número';
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)) {
      newErrors.password = 'Debe incluir un carácter especial';
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setMessage('');
  };

  const handleDateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, date_of_birth: value }));
    setErrors((prev) => ({ ...prev, date_of_birth: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const { country_id, state_id, city_id, ...rest } = formData;
      const dataToSend = { ...rest, location: { city_id } };
      const res = await apiClient.post('/auth/sign-up', dataToSend);
      const { user_id } = res.data.data.user;
      router.push(`/confirm-account?email=${formData.email}&user_id=${user_id}`);
    } catch (err: any) {
      const msg =
        err.response?.data?.data?.error?.[0]?.message || 'Error al registrar.';
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card className="p-8 shadow-xl rounded-2xl bg-white space-y-6 overflow-visible">
        <Heading title="Registro de Usuario" subtitle="Crea tu cuenta para comenzar" center />
        <form onSubmit={handleSubmit} className="space-y-4">
          <UserFields formData={formData} errors={errors} onChange={handleChange} />
          <PersonalInfo
            date_of_birth={formData.date_of_birth}
            gender={formData.gender}
            errors={errors}
            onChange={handleChange}
            onDateChange={handleDateChange}
          />
          <BioField bio={formData.bio} onChange={handleChange} />
          <LocationSelector
            countries={countries}
            states={states}
            cities={cities}
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
          <PasswordFields
            password={formData.password}
            confirm_password={formData.confirm_password}
            errors={errors}
            onChange={handleChange}
          />
          <RegisterFooter loading={loading} message={message} />
        </form>
      </Card>
    </div>
  );
}