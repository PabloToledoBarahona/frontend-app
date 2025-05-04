'use client';

import Sidebar from '@/components/ui/Sidebar';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { useEffect } from 'react';
import { checkAuth } from '@/lib/checkAuth';

export default function ChannelsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/v1/auth/sign-out", {
      method: "POST",
      credentials: "include", 
    });
    router.push("/");
  };

  useEffect(() => {
    const validateAuth = async () => {
      const auth = await checkAuth();
      if (!auth) {
        router.push("/");
      }
    };
  
    validateAuth();
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