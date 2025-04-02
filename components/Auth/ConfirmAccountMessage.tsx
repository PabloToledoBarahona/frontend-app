"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import apiClient from "@/lib/apiClient";
import { FiMail, FiKey } from "react-icons/fi";

export default function ConfirmAccountMessage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const emailFromUrl = searchParams?.get("email");

  useEffect(() => {
    if (emailFromUrl) setEmail(emailFromUrl);
  }, [emailFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/confirm-account", { email, otp });
      setMessage(response.data?.message || "Cuenta confirmada");
      setSuccess(true);
    } catch (error: any) {
      console.error("Error al confirmar cuenta:", error.response?.data || error.message);
      setMessage("Error al confirmar cuenta. Verifica tus datos.");
    }
  };

  return (
    <Card>
      <Heading
        title="Confirma tu cuenta"
        subtitle="Revisa tu correo e ingresa el código"
        center
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<FiMail />}
        />
        <Input
          name="otp"
          placeholder="Código de verificación"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          icon={<FiKey />}
        />
        <Button type="submit" label="Confirmar Cuenta" />
      </form>

      {message && (
        <p className={`text-sm text-center mt-4 ${success ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </Card>
  );
}