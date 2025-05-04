"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import UploadCSVPageContent from "@/components/Excel/UploadCSVPageContent";
import apiClient from "@/lib/apiClient";

export default function UploadCSVPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        await apiClient.get("/auth/status");
        setCheckingAuth(false);
      } catch (err) {
        router.push("/");
      }
    }
    checkAuth();
  }, [router]);

  if (checkingAuth) {
    return null;
  }

  return (
    <main className="min-h-screen flex bg-gray-100 ml-64">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-8">
        <UploadCSVPageContent />
      </div>
    </main>
  );
}