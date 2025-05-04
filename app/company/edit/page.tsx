'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';
import { Heading } from '@/components/ui/Heading';
import { CompanyForm } from '@/components/Company/CompanyForm';
import { checkAuth } from '@/lib/checkAuth';

export default function EditCompanyPage() {
  const router = useRouter();

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
    <main className="min-h-screen flex bg-gray-100 ml-64">
      <Sidebar />
      <div className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Heading
            title="Registrar Compañía"
            subtitle="Llena el formulario para crear o actualizar tu compañía"
          />
          <div className="mt-8">
            <CompanyForm />
          </div>
        </div>
      </div>
    </main>
  );
}