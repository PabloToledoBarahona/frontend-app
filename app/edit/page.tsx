'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import { EditProfileForm } from '@/components/User/EditProfileForm';

export default function EditProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <EditProfileForm />
      </div>
    </main>
  );
}