"use client";

import { useState } from "react";
import { Button, addToast } from "@heroui/react";
import { Zap } from "lucide-react";
import apiClient from "@/lib/apiClient";

interface Channel {
  _id: string;
  createdAt: string;
  status: "active" | "inactive";
}

interface ChannelCardProps {
  channel: Channel;
  companyIsActive: boolean;
  onChannelActivated: () => void;
}

export function ChannelCard({
  channel,
  companyIsActive,
  onChannelActivated,
}: ChannelCardProps) {
  const [loading, setLoading] = useState(false);

  const handleActivateChannel = async () => {
    setLoading(true);
    try {
      await apiClient.put("/channel/activate");
      addToast({
        title: "Canal activado",
        description: "El canal ha sido activado correctamente.",
        color: "success",
      });
      onChannelActivated();
    } catch (err) {
      console.error("Error al activar el canal:", err);
      addToast({
        title: "Error",
        description: "No se pudo activar el canal.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl ring-1 ring-gray-200 transition hover:shadow-2xl space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Canal asociado a esta empresa
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Creado: {new Date(channel.createdAt).toLocaleDateString()}
          </p>
        </div>

        {channel.status === "inactive" && (
          <button
            onClick={handleActivateChannel}
            disabled={!companyIsActive || loading}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all border ${
              companyIsActive
                ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
          >
            <Zap size={16} />
            Activar canal
          </button>
        )}
      </div>

      <span
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
          channel.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {channel.status === "active" ? "Activo" : "Inactivo"}
      </span>
    </div>
  );
}