'use client';

import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ConfirmAccountMessage() {
  return (
    <Card>
      <Heading
        title="Confirma tu cuenta"
        subtitle="Te hemos enviado un correo con un enlace para confirmar tu cuenta."
        center
      />
      <Button
        label="Volver al inicio de sesión"
        onClick={() => (window.location.href = '/login')}
      />
    </Card>
  );
}