'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LocationSelector } from './LocationSelector';
import { addToast } from '@heroui/react';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

interface CompanyData {
  name: string;
  legal_name: string;
  nit: string;
  description: string;
  city_id: string;
}

interface Props {
  initialData: CompanyData & {
    location: {
      country_id: string;
      state_id: string;
      city_id: string;
    };
  };
}

export function CompanyForm({ initialData }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.legal_name.trim()) newErrors.legal_name = 'Razón social requerida';
    if (!formData.nit.trim()) newErrors.nit = 'NIT requerido';
    if (!formData.description.trim()) newErrors.description = 'Descripción requerida';
    if (!formData.location.country_id) newErrors.country_id = 'País requerido';
    if (!formData.location.state_id) newErrors.state_id = 'Estado requerido';
    if (!formData.location.city_id) newErrors.city_id = 'Ciudad requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await apiClient.put('/company', {
        ...formData,
        city_id: formData.location.city_id,
      });

      addToast({
        title: 'Actualizado',
        description: 'Los datos de la compañía fueron actualizados.',
        color: 'success',
      });

      router.push('/company');
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.message || 'No se pudo actualizar.',
        color: 'danger',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8 bg-white p-8 rounded-2xl shadow-xl">
      <Input
        name="name"
        placeholder="Nombre de la compañía"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Input
        name="legal_name"
        placeholder="Razón social"
        value={formData.legal_name}
        onChange={handleChange}
        error={errors.legal_name}
      />
      <Input
        name="nit"
        placeholder="NIT"
        value={formData.nit}
        onChange={handleChange}
        error={errors.nit}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}

      <LocationSelector
        location={formData.location}
        onChange={handleLocationChange}
        errors={errors}
      />

      <div className="pt-4">
        <Button type="submit" label="Actualizar compañía" />
      </div>
    </form>
  );
}