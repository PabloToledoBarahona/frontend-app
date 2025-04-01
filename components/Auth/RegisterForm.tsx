'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';
import { User } from '@/types/User';

export default function RegisterForm() {
  const [formData, setFormData] = useState<User>({
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registro enviado:', formData);
  };

  return (
    <Card>
      <Heading title="Registro de Usuario" subtitle="Crea tu cuenta para comenzar" center />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} />
        <Input name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} />
        <Input name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} />
        <Input name="phone_number" placeholder="Teléfono" value={formData.phone_number || ''} onChange={handleChange} />
        <Input name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
        <Input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
        <Input name="confirm_password" type="password" placeholder="Confirmar contraseña" value={formData.confirm_password || ''} onChange={handleChange} />
        <Button type="submit" label="Registrarse" />
      </form>
    </Card>
  );
}