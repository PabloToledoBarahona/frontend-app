"use client";

import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { User } from "@/types/User";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

export default function RegisterForm() {
  const router = useRouter();

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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Partial<User> = {};

    if (!formData.username) newErrors.username = "Campo requerido";
    if (!formData.first_name) newErrors.first_name = "Campo requerido";
    if (!formData.last_name) newErrors.last_name = "Campo requerido";

    if (!formData.phone_number || !/^\d{7,15}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Teléfono inválido (solo números)";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Debe incluir una mayúscula";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Debe incluir una minúscula";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Debe incluir un número";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)) {
      newErrors.password = "Debe incluir un carácter especial";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Las contraseñas no coinciden";
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
      const { confirm_password, password, ...rest } = formData;

      const dataToSend = {
        ...rest,
        password,
        confirmPassword: confirm_password,
      };

      const response = await apiClient.post("/sign-up", dataToSend);

      if (response.status === 200 || response.status === 201) {
        const otp = response.data.otp;
        const email = formData.email;
        router.push(`/confirm-account?email=${encodeURIComponent(email)}&otp=${otp}`);
      } else {
        setMessage("Ocurrió un error inesperado. Intenta nuevamente.");
        console.error("Error en el registro:", response.data);
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.data?.error?.[0]?.message ||
        "Error de red o usuario ya registrado";
      setMessage(msg);
      console.error("Error de red:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Heading
        title="Registro de Usuario"
        subtitle="Crea tu cuenta para comenzar"
        center
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} icon={<FiUser />} error={errors.username} />
        <Input name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} icon={<FiUser />} error={errors.first_name} />
        <Input name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} icon={<FiUser />} error={errors.last_name} />
        <Input name="phone_number" type="tel" placeholder="Teléfono" value={formData.phone_number || ""} onChange={handleChange} icon={<FiPhone />} error={errors.phone_number} />
        <Input name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} icon={<FiMail />} error={errors.email} />
        <Input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} icon={<FiLock />} error={errors.password} />
        <Input name="confirm_password" type="password" placeholder="Confirmar contraseña" value={formData.confirm_password || ""} onChange={handleChange} icon={<FiLock />} error={errors.confirm_password} />

        <Button type="submit" label={loading ? "Registrando..." : "Registrarse"} disabled={loading} />

        {message && (
          <p className="text-sm text-center mt-2 text-red-600">{message}</p>
        )}

        <div className="text-center text-sm text-gray-900 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </div>
      </form>
    </Card>
  );
}