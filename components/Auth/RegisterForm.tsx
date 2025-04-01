"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { User } from "@/types/User";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

export default function RegisterForm() {
  const [formData, setFormData] = useState<User>({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<Partial<User>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Partial<User> = {};

    if (!formData.username) newErrors.username = "Campo requerido";
    if (!formData.first_name) newErrors.first_name = "Campo requerido";
    if (!formData.last_name) newErrors.last_name = "Campo requerido";
    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = "Correo inválido";
    if (!formData.password) newErrors.password = "Campo requerido";
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Las contraseñas no coinciden";

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
      const { confirm_password, ...dataToSend } = formData;

      // Simulación de envío al backend
      setTimeout(() => {
        console.log("Datos enviados al backend (simulado):", dataToSend);
        setSuccess(true);
      }, 1000);

      // Cuando tengamos el backend listo descomentamos esto:
      /*
      const response = await fetch('https://tubackend.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        setSuccess(true);
      } else {
        console.error('❌ Error en el registro');
      }
      */
    } catch (error) {
      console.error("❌ Error de red:", error);
    }
  };

  if (success) {
    return (
      <Card>
        <Heading
          title="¡Gracias por registrarte!"
          subtitle="Tu cuenta ha sido creada con éxito"
          center
        />
        <Button
          label="Iniciar sesión"
          onClick={() => (window.location.href = "/login")}
        />
      </Card>
    );
  }

  return (
    <Card>
      <Heading
        title="Registro de Usuario"
        subtitle="Crea tu cuenta para comenzar"
        center
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          icon={<FiUser />}
          error={errors.username}
        />
        <Input
          name="first_name"
          placeholder="Nombre"
          value={formData.first_name}
          onChange={handleChange}
          icon={<FiUser />}
          error={errors.first_name}
        />
        <Input
          name="last_name"
          placeholder="Apellido"
          value={formData.last_name}
          onChange={handleChange}
          icon={<FiUser />}
          error={errors.last_name}
        />
        <Input
          name="phone_number"
          placeholder="Teléfono"
          value={formData.phone_number || ""}
          onChange={handleChange}
          icon={<FiPhone />}
        />
        <Input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          icon={<FiMail />}
          error={errors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          icon={<FiLock />}
          error={errors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirmar contraseña"
          value={formData.confirm_password || ""}
          onChange={handleChange}
          icon={<FiLock />}
          error={errors.confirm_password}
        />
        <Button type="submit" label="Registrarse" />
        <div className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </div>
      </form>
    </Card>
  );
}
