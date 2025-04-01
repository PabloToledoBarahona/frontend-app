'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Correo inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Campo requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulación del backend
    setTimeout(() => {
      console.log('✅ Login enviado:', formData);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <Card>
        <Heading title="¡Bienvenido!" subtitle="Inicio de sesión exitoso" center />
        <Button label="Ir al inicio" onClick={() => (window.location.href = '/')} />
      </Card>
    );
  }

  return (
    <Card>
      <Heading title="Iniciar Sesión" subtitle="Ingresa tus credenciales" center />
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
      </form>
    </Card>
  );
}