"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { FiMail, FiLock } from "react-icons/fi";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }
    if (!formData.password) {
      newErrors.password = "Campo requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await apiClient.post("/auth/sign-in", formData);
      const token = response.data?.data?.authToken;

      if (token) {
        localStorage.setItem("authToken", token);
        onSuccess();
      } else {
        setMessage("Token no recibido. Intenta de nuevo.");
      }
    } catch (error: any) {
      const backendMsg =
        error.response?.data?.data?.error?.[0]?.message ||
        "Credenciales incorrectas";
      setMessage(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-lg rounded-xl bg-white w-full max-w-md mx-auto">
      <Heading
        title="Iniciar Sesión"
        subtitle="Ingresa tus credenciales para acceder"
        center
      />
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <Input
          name="email"
          placeholder="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon={<FiMail />}
          error={errors.email}
        />
        <Input
          name="password"
          placeholder="Contraseña"
          type="password"
          value={formData.password}
          onChange={handleChange}
          icon={<FiLock />}
          error={errors.password}
        />
        <div className="text-sm text-right">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button
          type="submit"
          label={loading ? "Ingresando..." : "Iniciar Sesión"}
          disabled={loading}
          className="w-full"
        />
        {message && (
          <p className="text-sm text-center mt-2 text-red-600">{message}</p>
        )}
      </form>

      <div className="text-center mt-6 text-sm">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Regístrate
        </Link>
      </div>
    </Card>
  );
}
