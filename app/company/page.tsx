"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@heroui/react";
import { Button } from "@/components/ui/Button";
import { CompanyCard } from "@/components/Company/CompanyCard";
import Sidebar from "@/components/ui/Sidebar";
import { Heading } from "@/components/ui/Heading";
import apiClient from "@/lib/apiClient";
import axios from "axios";
import { ChannelCard } from "@/components/Channels/ChannelCard";

interface Channel {
  _id: string;
  createdAt: string;
  status: "active" | "inactive";
}

interface Company {
  name: string;
  nit?: string;
  legal_name?: string;
  description?: string;
  status: "active" | "inactive";
  city_id?: string;
}

export default function CompanyPage() {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [locationDetails, setLocationDetails] = useState({});

  useEffect(() => {
    const fetchCompanyAndChannel = async () => {
      try {
        // 1. Obtener compañía
        const resCompany = await apiClient.get("/company/me");
        const comp = resCompany.data.data;
        setCompany(comp);

        // 2. Ubicación
        try {
          if (comp.city_id) {
            const cityRes = await apiClient.get(
              `/location/cities/${comp.city_id}`
            );
            const city = cityRes.data.data;

            if (city?.state_id) {
              const stateRes = await apiClient.get(
                `/location/states/${city.state_id}`
              );
              const state = stateRes.data.data;
              console.log("STATE", state);

              if (state?.country_id) {
                const countryRes = await apiClient.get(
                  `/location/countries/${state.country_id}`
                );
                const country = countryRes.data.data;

                setLocationDetails({
                  city: city.name,
                  state: state.name,
                  country: country.name,
                });
              } else {
                console.warn("No se encontró country_id en el estado:", state);
              }
            } else {
              console.warn("No se encontró state_id en la ciudad:", city);
            }
          }
        } catch (locationErr) {
          console.error("Error al cargar la ubicación:", locationErr);
        }

        // 3. Canal
        try {
          const resChannel = await apiClient.get("/channel/me");
          const foundChannel = resChannel.data?.data;
          setChannel(foundChannel);
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.status !== 404) {
            setError("Error al cargar el canal.");
          }
        }
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setCompany(null);
        } else {
          setError("No se pudo cargar la información de la compañía.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyAndChannel();
  }, []);

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      <Sidebar />
      <div className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Heading title="Mi Compañía" />

          {loading && (
            <p className="text-gray-600 mt-8 text-center">
              Cargando información...
            </p>
          )}

          {!loading && error && !company && !channel && (
            <div className="mt-8">
              <Alert
                color="danger"
                title="Ocurrió un error"
                description={error}
              />
            </div>
          )}

          {!loading && company && channel === null && (
            <div className="bg-white p-6 rounded-2xl shadow-md border text-center text-sm text-gray-500">
              No hay ningún canal asociado aún.
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
                onClick={() => router.push("/company/register")}
              />
            </div>
          )}

          {!loading && company && (
            <div className="mt-10 space-y-6">
              <CompanyCard
                company={company}
                locationDetails={locationDetails}
                onStatusChange={(newStatus) => {
                  setCompany((prev) => prev && { ...prev, status: newStatus });
                  if (newStatus === "inactive") {
                    setChannel(
                      (prev) => prev && { ...prev, status: "inactive" }
                    );
                  }
                }}
              />

              {channel && (
                <ChannelCard
                  channel={channel}
                  companyIsActive={company.status === "active"}
                  onChannelActivated={() =>
                    setChannel((prev) => prev && { ...prev, status: "active" })
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
