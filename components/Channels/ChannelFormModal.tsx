'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { FiX } from 'react-icons/fi';
import apiClient from '@/lib/apiClient';

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function ChannelFormModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
      onCreated();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.data?.error?.[0]?.message ||
        'Ocurrió un error al crear el canal.'
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-md mx-auto">
        <Card>
          <button
            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>

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
      </div>
    </div>
  );
}