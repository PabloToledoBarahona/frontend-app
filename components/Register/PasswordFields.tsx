'use client';
import { Input } from '@/components/ui/Input';
import { FiLock } from 'react-icons/fi';

type Props = {
  password?: string;
  confirm_password?: string;
  errors: Partial<Record<string, string>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PasswordFields({ password, confirm_password, errors, onChange }: Props) {
  return (
    <>
      <Input name="password" type="password" placeholder="Contraseña" value={password} onChange={onChange} icon={<FiLock />} error={errors.password} />
      <Input name="confirm_password" type="password" placeholder="Confirmar contraseña" value={confirm_password} onChange={onChange} icon={<FiLock />} error={errors.confirm_password} />
    </>
  );
}

export default PasswordFields;