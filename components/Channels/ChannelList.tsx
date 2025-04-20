'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import ChannelForm from './ChannelForm';
import { FiHome } from 'react-icons/fi';

interface Channel {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function ChannelList() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const router = useRouter(); 

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await apiClient.get('/channel/my-channels');
        setChannels(response.data?.data?.channels || []);
      } catch (err: any) {
        setError('Error al cargar los canales');
      }
    };

    fetchChannels();
  }, [showModal]);

  return (
    <>
      <Card>
        <Heading title="Mis canales" subtitle="Canales creados por ti" center />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="flex justify-center my-4">
          <Button label="Crear canal" onClick={() => setShowModal(true)} />
        </div>

        <ul className="mt-4 space-y-2">
          {channels.map((ch) => (
            <li
              key={ch._id}
              className="border p-4 rounded-lg shadow-sm bg-gray-50 text-gray-900"
            >
              <strong>{ch.title}</strong>
              <p className="text-sm text-gray-700">{ch.description}</p>
              <p className="text-xs text-gray-500">
                Creado: {new Date(ch.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-[var(--background)]/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="rounded-lg p-0 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              &times;
            </button>
            <ChannelForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}