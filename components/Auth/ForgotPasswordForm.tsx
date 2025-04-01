'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FiMail } from 'react-icons/fi';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Correo inválido');
      return;
    }

    setError('');
    setTimeout(() => {
      console.log('📩 Enviado link de recuperación a:', email);
      setSent(true);
    }, 1000);
  };

  if (sent) {
    return (
      <Card>
        <Heading title="¡Revisa tu correo!" subtitle="Te enviamos un enlace para restablecer tu contraseña" center />
        <Button label="Volver al login" onClick={() => (window.location.href = '/login')} />
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
        <Button type="submit" label="Enviar enlace de recuperación" />
      </form>
    </Card>
  );
}