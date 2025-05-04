'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@heroui/react';
import { Button } from '@/components/ui/Button';
import { CompanyCard } from '@/components/Company/CompanyCard';
import Sidebar from '@/components/ui/Sidebar';
import { Heading } from '@/components/ui/Heading';
import apiClient from '@/lib/apiClient';

export default function CompanyPage() {
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await apiClient.get('/company/me');
        setCompany(res.data.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setCompany(null);
        } else {
          setError('No se pudo cargar la información de la compañía.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      <Sidebar />
      <div className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Heading title="Mi Compañía" />

          {loading && (
            <p className="text-gray-600 mt-8 text-center">Cargando información...</p>
          )}

          {!loading && error && (
            <div className="mt-8">
              <Alert
                color="danger"
                title="Ocurrió un error"
                description={error}
              />
            </div>
          )}

          {!loading && !company && !error && (
            <div className="bg-white rounded-3xl shadow-xl mt-10 px-8 py-10 flex flex-col items-center justify-center space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  No tienes una compañía registrada
                </h3>
                <p className="text-sm text-gray-600">
                  Para comenzar a utilizar el sistema, registra tu compañía.
                </p>
              </div>
              <Button
                label="Registrar Compañía"
                className="w-full max-w-xs"
                onClick={() => router.push('/company/register')}
              />
            </div>
          )}

          {!loading && company && (
            <div className="mt-10">
              <CompanyCard company={company} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}