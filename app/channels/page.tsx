'use client';

import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import ChannelList from '@/components/Channels/ChannelList';

export default function ChannelsPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-100 relative px-4 pt-4 pb-8">
      {/* Botón de logout (ícono) en esquina superior derecha */}
      <button
        onClick={handleLogout}
        title="Cerrar sesión"
        className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
      >
        <FiLogOut size={22} />
      </button>

      <ChannelList />
    </main>
  );
}