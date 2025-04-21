// components/ui/Sidebar.tsx
"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { FiUpload, FiUser, FiClock } from "react-icons/fi";
import { Heading } from "./Heading";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white z-10">
      <Card className="h-full flex flex-col justify-between p-4">
        <div>
          <div className="text-xl font-bold mb-8 text-center text-gray-200">
            {/* Hacemos que el Heading sea un enlace */}
            <Link href="/dashboard">
              <Heading title="Te Lo Cobro" subtitle="" center />
            </Link>
          </div>

          <ul className="space-y-4">
            <li>
              <Link
                href="/profile"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
              >
                <FiUser className="text-lg" />
                <span>Perfil</span>
              </Link>
            </li>
            <li>
              <Link
                href="/excel"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
              >
                <FiUpload className="text-lg" />
                <span>Subir Archivos</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
              >
                <FiClock className="text-lg" />
                <span>Próximamente</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center text-sm text-gray-400 mt-8">
          <p>&copy; 2025 Te Lo Cobro</p>
        </div>
      </Card>
    </div>
  );
}
