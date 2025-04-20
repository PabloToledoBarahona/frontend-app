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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!title.trim() || !description.trim()) {
      setError('Completa todos los campos');
      return;
    }

    try {
      await apiClient.post('/channel/create', {
        title,
        description,
      });

      setMessage('Canal creado exitosamente');
      setTitle('');
      setDescription('');
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
      <Heading title="Crear canal" subtitle="Ingresa los datos del canal" center />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Título del canal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          name="description"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" label="Crear canal" />
      </form>

      {message && <p className="text-sm text-green-600 mt-4 text-center">{message}</p>}
      {error && <p className="text-sm text-red-600 mt-4 text-center">{error}</p>}
    </Card>
  );
}