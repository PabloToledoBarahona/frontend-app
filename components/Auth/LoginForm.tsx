"use client";
import apiClient from '@/lib/apiClient';
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { FiMail, FiLock } from "react-icons/fi";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email || !formData.email.includes("@")) {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const response = await apiClient.post('/login', formData);
      console.log('✅ Login correcto:', response.data);
  
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
    }
  };

  if (success) {
    return (
      <Card>
        <Heading
          title="¡Bienvenido!"
          subtitle="Inicio de sesión exitoso"
          center
        />
        <Button
          label="Ir al inicio"
          onClick={() => (window.location.href = "/")}
        />
      </Card>
    );
  }

  return (
    <Card>
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
        <Button type="submit" label="Iniciar Sesión" />
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <a href="/forgot-password" className="hover:underline text-blue-600">
            ¿Olvidaste tu contraseña?
          </a>
          <a href="/register" className="hover:underline text-blue-600">
            Crear cuenta
          </a>
        </div>
      </form>
    </Card>
  );
}
