'use client';

interface CompanyCardProps {
  company: {
    name: string;
    nit?: string;
    status: string;
  };
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
      {company.nit && (
        <p className="text-sm text-gray-600">NIT: {company.nit}</p>
      )}
      <p className="text-sm text-gray-600">
        Estado: {company.status === 'active' ? 'Activa' : 'Inactiva'}
      </p>
    </div>
  );
}