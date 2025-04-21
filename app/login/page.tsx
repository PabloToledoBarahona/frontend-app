"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/excel");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
}
