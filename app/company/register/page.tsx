'use client';

import Sidebar from '@/components/ui/Sidebar';
import { Heading } from '@/components/ui/Heading';
import { CompanyForm } from '@/components/Company/CompanyForm';

export default function RegisterCompanyPage() {
  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      <Sidebar />
      <div className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Heading
            title="Registrar Compañía"
            subtitle="Llena el formulario para registrar una nueva compañía"
          />
          <div className="mt-8">
            <CompanyForm mode="create" />
          </div>
        </div>
      </div>
    </main>
  );
}