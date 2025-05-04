"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import { Heading } from "@/components/ui/Heading";
import { CompanyForm } from "@/components/Company/CompanyForm";
import apiClient from "@/lib/apiClient";
import { Spinner } from "@/components/ui/Spinner";
import { Alert } from "@heroui/react";

interface CompanyFormData {
  name: string;
  legal_name: string;
  nit: string;
  description: string;
  location: {
    country_id: string;
    state_id: string;
    city_id: string;
  };
}

export default function UpdateCompanyPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<CompanyFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await apiClient.get("/company/me");
        const company = res.data.data;

        setInitialData({
          name: company.name,
          legal_name: company.legal_name,
          nit: company.nit,
          description: company.description,
          location: {
            country_id: "", // Se puede completar luego con lógica adicional
            state_id: "",
            city_id: company.city_id,
          },
        });
      } catch (err: any) {
        setError("No se pudo cargar la información de la compañía.");
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
          <Heading
            title="Editar Compañía"
            subtitle="Modifica los datos de tu compañía"
          />

          {loading && (
            <div className="mt-10">
              <Spinner />
            </div>
          )}

          {!loading && error && (
            <div className="mt-8">
              <Alert color="danger" title="Error" description={error} />
            </div>
          )}

          {!loading && initialData && (
            <div className="mt-8">
              <CompanyForm initialData={initialData} mode="edit" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
