'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

type Props = {
  loading: boolean;
  message: string;
};

function RegisterFooter({ loading, message }: Props) {
  return (
    <>
      <Button type="submit" label={loading ? 'Registrando...' : 'Registrarse'} disabled={loading} className="w-full" />
      {message && <p className="text-sm text-center mt-2 text-red-600">{message}</p>}
      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="text-blue-600 hover:underline font-semibold">
          Inicia sesión
        </Link>
      </p>
    </>
  );
}

export default RegisterFooter;