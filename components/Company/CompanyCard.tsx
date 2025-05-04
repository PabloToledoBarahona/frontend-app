"use client";

import { Listbox, ListboxItem } from "@heroui/react";
import { Pencil, Power } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, addToast } from "@heroui/react";
import apiClient from "@/lib/apiClient";

interface CompanyCardProps {
  company: {
    name: string;
    nit?: string;
    legal_name?: string;
    description?: string;
    status: string;
  };
  locationDetails?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

export function CompanyCard({ company, locationDetails }: CompanyCardProps) {
  const router = useRouter();
  const [status, setStatus] = useState(company.status);
  const [loading, setLoading] = useState(false);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      if (status === "active") {
        await apiClient.put("/company/desactivate");
        setStatus("inactive");
        addToast({
          title: "Empresa desactivada",
          description: "Tu empresa ha sido desactivada correctamente.",
          color: "warning",
        });
      } else {
        await apiClient.put("/company/activate");
        setStatus("active");
        addToast({
          title: "Empresa activada",
          description: "Tu empresa ha sido activada correctamente.",
          color: "success",
        });
      }
    } catch (err: any) {
      addToast({
        title: "Error",
        description: "No se pudo cambiar el estado de la empresa.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 rounded-3xl shadow-lg ring-1 ring-gray-200 space-y-5">
      {/* Botón de editar */}
      <button
        onClick={() => router.push("/company/edit")}
        className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition-colors"
        aria-label="Editar compañía"
      >
        <Pencil size={20} />
      </button>

      <h2 className="text-3xl font-bold text-gray-800">{company.name}</h2>

      <div className="border-t border-gray-200 pt-4 space-y-2 text-gray-700 text-sm">
        {company.legal_name && (
          <p>
            <span className="font-medium">Razón social:</span>{" "}
            {company.legal_name}
          </p>
        )}
        {company.nit && (
          <p>
            <span className="font-medium">NIT:</span> {company.nit}
          </p>
        )}
        {company.description && (
          <p>
            <span className="font-medium">Descripción:</span>{" "}
            {company.description}
          </p>
        )}
        {locationDetails?.city &&
          locationDetails?.state &&
          locationDetails?.country && (
            <p>
              <span className="font-medium">Ubicación:</span>{" "}
              {locationDetails.city}, {locationDetails.state},{" "}
              {locationDetails.country}
            </p>
          )}

        <div className="pt-4 flex items-center justify-between">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status === "active" ? "Activa" : "Inactiva"}
          </span>

          <Button
            size="sm"
            color={status === "active" ? "warning" : "success"}
            onClick={handleToggleStatus}
            isLoading={loading}
          >
            {status === "active" ? "Desactivar" : "Activar"}
          </Button>
        </div>
      </div>
    </div>
  );
}