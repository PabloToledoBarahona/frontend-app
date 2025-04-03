'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import apiClient from '@/lib/apiClient';

interface Props {
  onSuccess: () => void;
}

export default function ChannelForm({ onSuccess }: Props) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!name.trim()) {
      setError('El nombre del canal es obligatorio');
      return;
    }

    try {
      await apiClient.post('/channel/create', {
        title: name,
        description: 'Canal creado desde el frontend',
      });
      setMessage('Canal creado exitosamente');
      setName('');
      onSuccess(); 
    } catch (err: any) {
      const msg =
        err.response?.data?.data?.error?.[0]?.message ||
        'Ocurrió un error al crear canal';
      setError(msg);
    }
  };

  return (
    <Card>
      <Heading title="Crear canal" subtitle="Ingresa el nombre del canal" center />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Nombre del canal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" label="Crear canal" />
      </form>

      {message && <p className="text-sm text-green-600 mt-4 text-center">{message}</p>}
      {error && <p className="text-sm text-red-600 mt-4 text-center">{error}</p>}
    </Card>
  );
}