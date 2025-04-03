"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { FiMail, FiLock } from "react-icons/fi";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
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
        setSuccess(true);
      } else {
        setMessage("Token no recibido. Intenta de nuevo.");
      }
    } catch (error: any) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data || error.message
      );
      const backendMsg =
        error.response?.data?.data?.error?.[0]?.message ||
        "Credenciales incorrectas";
      setMessage(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {success ? (
        <>
          <Heading
            title="¡Bienvenido!"
            subtitle="Inicio de sesión exitoso"
            center
          />
          <div className="flex justify-center gap-4 mt-4 flex-col sm:flex-row">
            <Button
              label="Ir a mis canales"
              onClick={() => (window.location.href = "/channels")}
            />
            <Button
              label="Cargar .CSV"
              onClick={() => (window.location.href = "/excel")}
              variant="secondary"
            />
          </div>
        </>
      ) : (
        <>
          <Heading
            title="Iniciar Sesión"
            subtitle="Ingresa tus credenciales"
            center
          />
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button
              type="submit"
              label={loading ? "Ingresando..." : "Iniciar Sesión"}
              disabled={loading}
            />
            {message && (
              <p className="text-sm text-center mt-2 text-red-600">{message}</p>
            )}
            <div className="flex justify-between text-sm text-gray-600 mt-4">
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="hover:underline text-blue-600"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="hover:underline text-blue-600"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </>
      )}
    </Card>
  );
}
