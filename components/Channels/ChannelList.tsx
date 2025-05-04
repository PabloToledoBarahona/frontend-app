"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Button, addToast } from "@heroui/react";
import ChannelForm from "./ChannelForm";
import { FiHome } from "react-icons/fi";

interface Channel {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  status: "active" | "inactive";
}

export default function ChannelList() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const router = useRouter();

  const fetchChannels = async () => {
    try {
      const response = await apiClient.get("/channel/my-channels");
      setChannels(response.data?.data?.channels || []);
    } catch (err: any) {
      setError("Error al cargar los canales");
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [showModal]);

  const toggleStatus = async (
    id: string,
    currentStatus: "active" | "inactive"
  ) => {
    setLoadingId(id);
    try {
      const endpoint =
        currentStatus === "active"
          ? "/channel/deactivate"
          : "/channel/activate";
      await apiClient.put(endpoint);

      addToast({
        title: `Canal ${
          currentStatus === "active" ? "desactivado" : "activado"
        }`,
        description: `El canal ha sido ${
          currentStatus === "active" ? "desactivado" : "activado"
        } correctamente.`,
        color: currentStatus === "active" ? "warning" : "success",
      });

      fetchChannels();
    } catch {
      addToast({
        title: "Error",
        description: "No se pudo actualizar el estado del canal.",
        color: "danger",
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Card>
        <Heading title="Mis canales" subtitle="Canales creados por ti" center />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="flex justify-center my-4">
          <Button onClick={() => setShowModal(true)}>Crear canal</Button>
        </div>

        <ul className="mt-4 space-y-3">
          {channels.map((ch) => (
            <li
              key={ch._id}
              className="border p-4 rounded-xl shadow-sm bg-white flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {ch.title}
                  </h3>
                  <p className="text-sm text-gray-600">{ch.description}</p>
                  <p className="text-xs text-gray-500">
                    Creado: {new Date(ch.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    ch.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {ch.status === "active" ? "Activo" : "Inactivo"}
                </span>
              </div>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  color={ch.status === "active" ? "warning" : "success"}
                  isLoading={loadingId === ch._id}
                  onClick={() => toggleStatus(ch._id, ch.status)}
                >
                  {ch.status === "active" ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-[var(--background)]/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="rounded-lg p-0 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              &times;
            </button>
            <ChannelForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
