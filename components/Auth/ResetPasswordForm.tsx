'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FiMail, FiLock, FiKey } from 'react-icons/fi';
import apiClient from '@/lib/apiClient';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const otpFromUrl = searchParams?.get('otp');

  useEffect(() => {
    if (otpFromUrl) setOtp(otpFromUrl);
  }, [otpFromUrl]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email || !email.includes('@')) newErrors.email = 'Correo inválido';
    if (!otp || otp.length !== 6) newErrors.otp = 'OTP inválido';
    if (!newPassword || newPassword.length < 8)
      newErrors.newPassword = 'Mínimo 8 caracteres';
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = 'No coinciden';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await apiClient.post('/reset-password', {
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      setSuccess(true);
      setMessage(response.data?.data?.message || 'Contraseña actualizada');
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (error: any) {
      console.error('Error:', error.response?.data);
      const msg = error.response?.data?.data?.error?.[0]?.message || 'Error al cambiar contraseña';
      setMessage(msg);
    }
  };

  return (
    <Card>
      <Heading
        title="Restablecer contraseña"
        subtitle="Ingresa los datos para cambiar tu contraseña"
        center
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<FiMail />}
          error={errors.email}
        />
        <Input
          name="otp"
          placeholder="Código de verificación"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          icon={<FiKey />}
          error={errors.otp}
        />
        <Input
          name="newPassword"
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          icon={<FiLock />}
          error={errors.newPassword}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={<FiLock />}
          error={errors.confirmPassword}
        />
        <Button type="submit" label="Cambiar contraseña" />
      </form>

      {message && (
        <p className={`text-sm text-center mt-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </Card>
  );
}