"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import UploadCSV from "@/components/Excel/UploadCSV";
import Sidebar from "@/components/ui/Sidebar";
import { useEffect } from "react";

export default function UploadCSVPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64"> {/* ml-64 por el sidebar */}
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-8 relative">
        {/* Componente de carga de CSV */}
        <UploadCSV />
      </div>
    </main>
  );
}
