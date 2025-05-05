"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
  addToast,
} from "@heroui/react";
import { MoreVertical, Pencil, Power } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiClient from "@/lib/apiClient";

interface CompanyCardProps {
  company: {
    name: string;
    nit?: string;
    legal_name?: string;
    description?: string;
    status: "active" | "inactive";
  };
  locationDetails?: {
    city?: string;
    state?: string;
    country?: string;
  };
  onStatusChange?: (newStatus: "active" | "inactive") => void;
}

export function CompanyCard({
  company,
  locationDetails,
  onStatusChange,
}: CompanyCardProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"active" | "inactive">(company.status);
  const [loading, setLoading] = useState(false);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      if (status === "active") {
        await apiClient.put("/company/desactivate");
        setStatus("inactive");
        onStatusChange?.("inactive");
        addToast({
          title: "Empresa desactivada",
          description: "Tu empresa ha sido desactivada correctamente.",
          color: "warning",
        });
      } else {
        await apiClient.put("/company/activate");
        setStatus("active");
        onStatusChange?.("active");
        addToast({
          title: "Empresa activada",
          description: "Tu empresa ha sido activada correctamente.",
          color: "success",
        });
      }
    } catch {
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
    <div className="relative bg-white p-6 rounded-3xl shadow-xl ring-1 ring-gray-200 transition hover:shadow-2xl space-y-6">
      {/* Menú de acciones */}
      <div className="absolute top-4 right-4 z-10">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              variant="light"
              size="sm"
              isIconOnly
              aria-label="Menú de opciones"
              className="text-gray-500 hover:text-purple-600"
            >
              <MoreVertical size={18} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Opciones de compañía"
            className="min-w-[180px] rounded-xl bg-white shadow-xl p-1 ring-1 ring-gray-200"
            variant="light"
            onAction={(key) => {
              if (key === "edit") router.push("/company/edit");
              else if (key === "toggle") handleToggleStatus();
            }}
          >
            <DropdownItem
              key="edit"
              startContent={<Pencil className="text-xl" />}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
            >
              Editar compañía
            </DropdownItem>
            <DropdownItem
              key="toggle"
              startContent={<Power className="text-xl" />}
              className={cn(
                "px-4 py-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer",
                status === "active" ? "text-warning" : "text-success"
              )}
            >
              {status === "active" ? "Desactivar compañía" : "Activar compañía"}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Información de la compañía */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{company.name}</h2>
        <span
          className={`mt-2 inline-block text-xs font-medium px-3 py-1 rounded-full ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status === "active" ? "Activa" : "Inactiva"}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-2">
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
      </div>
    </div>
  );
}