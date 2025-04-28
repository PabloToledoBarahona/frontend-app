"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/ui/Sidebar";
import UploadCSVPageContent from '@/components/Excel/UploadCSVPageContent';

export default function UploadCSVPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8">
        <UploadCSVPageContent />
      </div>
    </main>
  );
}