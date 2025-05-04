"use client";

import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LocationSelector } from "./LocationSelector";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

interface FormData {
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

export function CompanyForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    legal_name: '',
    nit: '',
    description: '',
    location: {
      country_id: '',
      state_id: '',
      city_id: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, any> = {};
    if (!formData.name.trim()) newErrors.name = "Nombre requerido";
    if (!formData.location.country_id) newErrors.country_id = "País requerido";
    if (!formData.location.state_id) newErrors.state_id = "Estado requerido";
    if (!formData.location.city_id) newErrors.city_id = "Ciudad requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      console.log("Enviando datos:", formData);
      const payload = {
        name: formData.name,
        legal_name: formData.legal_name,
        nit: formData.nit,
        description: formData.description,
        city_id: formData.location.city_id,
      };

      await apiClient.post("/company", payload);

      addToast({
        title: "¡Compañía creada!",
        description: "Tu compañía fue registrada exitosamente.",
        color: "success",
      });

      router.push("/company");
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message || "Error al registrar la compañía";
      addToast({
        title: "Error",
        description: msg,
        color: "danger",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
    >
      <Input
        name="name"
        placeholder="Nombre de la compañía"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

        <Input
        name="legal_name"
        placeholder="Razón social"
        value={formData.legal_name}
        onChange={handleChange}
        error={errors.legal_name}
        />

        <Input
        name="nit"
        placeholder="NIT"
        value={formData.nit}
        onChange={handleChange}
        error={errors.nit}
        />

      <textarea
        name="description"
        placeholder="Descripción"
        rows={4}
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <LocationSelector
        location={formData.location}
        onChange={handleLocationChange}
        errors={errors}
      />

      <div className="pt-4">
        <Button type="submit" label="Registrar compañía" />
      </div>
    </form>
  );
}
