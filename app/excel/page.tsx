"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import UploadCSV from "@/components/Excel/UploadCSV";
import Sidebar from "@/components/ui/Sidebar";

export default function UploadCSVPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64"> {/* ml-64 por el sidebar */}
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-8 relative">
        {/* Icono de logout en la esquina superior derecha */}
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <FiLogOut size={22} />
        </button>

        {/* Componente de carga de CSV */}
        <UploadCSV />
      </div>
    </main>
  );
}
