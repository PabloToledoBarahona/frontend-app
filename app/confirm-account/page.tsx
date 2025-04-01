// app/confirm-account/page.tsx
'use client';

import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ConfirmAccountPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card>
        <Heading
          title="Confirmar cuenta"
          subtitle="Hemos enviado un correo electrónico a la dirección registrada. Haz click en el enlace dentro del mensaje para confirmar tu cuenta."
          center
        />
        <Button
          label="Iniciar sesión"
          onClick={() => (window.location.href = '/login')}
        />
      </Card>
    </main>
  );
}