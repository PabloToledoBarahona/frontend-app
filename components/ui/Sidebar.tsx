// components/ui/Sidebar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import {
  FiUpload,
  FiUser,
  FiClock,
  FiLogOut,
  FiBriefcase,
} from "react-icons/fi";
import { Heading } from "./Heading";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/v1/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg flex flex-col justify-between z-20">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-10 text-center">
          <Link href="/dashboard">
            <Heading title="TeLoCobro" subtitle="" center />
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FiUser />
            <span className="text-sm font-medium">Perfil</span>
          </Link>

          {/* NUEVO ENLACE: Compañía */}
          <Link
            href="/company"
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FiBriefcase />
            <span className="text-sm font-medium">Compañía</span>
          </Link>

          <Link
            href="/excel"
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FiUpload />
            <span className="text-sm font-medium">Subir Archivos</span>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 text-gray-400 p-3 rounded-lg cursor-not-allowed"
          >
            <FiClock />
            <span className="text-sm font-medium">Próximamente</span>
          </Link>
        </nav>
      </div>

      {/* Botón de Logout y Footer */}
      <div className="p-6 space-y-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:bg-red-50 p-3 rounded-lg w-full transition font-medium text-sm"
        >
          <FiLogOut />
          Cerrar sesión
        </button>

        <p className="text-center text-xs text-gray-400">
          &copy; 2025 TeLoCobro
        </p>
      </div>
    </aside>
  );
}
