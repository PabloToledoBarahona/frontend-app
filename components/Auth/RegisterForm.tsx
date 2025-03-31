'use client';

import { useState } from 'react';
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
    console.log('Datos enviados (registro):', formData);
    // En el futuro: aquí se haría un fetch POST al backend
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
      <input name="username" placeholder="Nombre de usuario" onChange={handleChange} />
      <input name="first_name" placeholder="Nombre" onChange={handleChange} />
      <input name="last_name" placeholder="Apellido" onChange={handleChange} />
      <input name="phone_number" placeholder="Teléfono" onChange={handleChange} />
      <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <input name="confirm_password" type="password" placeholder="Confirmar contraseña" onChange={handleChange} />
      <button type="submit" style={{ marginTop: '12px' }}>Registrarse</button>
    </form>
  );
}