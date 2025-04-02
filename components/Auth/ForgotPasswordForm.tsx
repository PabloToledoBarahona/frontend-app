"use client";

import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FiMail } from "react-icons/fi";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Correo inválido");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await apiClient.post("/forgot-password", { email });

      setMessage(response.data?.data?.message || "Revisa tu bandeja de entrada");
      setSent(true);
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.data?.error?.[0]?.message ||
        "Ocurrió un error. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Card>
        <Heading
          title="¡Revisa tu correo!"
          subtitle={message}
          center
        />
        <Button label="Volver al login" onClick={() => (window.location.href = "/login")} />
      </Card>
    );
  }

  return (
    <Card>
      <Heading title="¿Olvidaste tu contraseña?" subtitle="Te ayudaremos a recuperarla" center />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          placeholder="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<FiMail />}
          error={error}
        />
        <Button type="submit" label={loading ? "Enviando..." : "Enviar código de recuperación"} disabled={loading} />
      </form>
    </Card>
  );
}