'use client';

import Sidebar from '@/components/ui/Sidebar';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { useEffect } from 'react';

export default function ChannelsPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  };

  useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/");
      }
    }, [router]);

  

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64"> {/* ml-64 por el sidebar */}
        <Sidebar/>
      {/* Botón de logout (ícono) en esquina superior derecha */}
      <button
        onClick={handleLogout}
        title="Cerrar sesión"
        className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
      >
        <FiLogOut size={22} />
      </button>

    
    </main>
  );
}