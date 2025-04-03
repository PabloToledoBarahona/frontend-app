"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import UploadCSV from "@/components/Excel/UploadCSV";

export default function UploadCSVPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 relative">
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
    </main>
  );
}