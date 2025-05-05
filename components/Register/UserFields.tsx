'use client';
import { Input } from '@/components/ui/Input';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';

type Props = {
  formData: {
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
  };
  errors: Partial<Record<string, string>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function UserFields({ formData, errors, onChange }: Props) {
  return (
    <>
      <Input
        name="username"
        placeholder="Nombre de usuario"
        value={formData.username}
        onChange={onChange}
        icon={<FiUser />}
        error={errors.username}
      />
      <Input
        name="first_name"
        placeholder="Nombre"
        value={formData.first_name}
        onChange={onChange}
        icon={<FiUser />}
        error={errors.first_name}
      />
      <Input
        name="last_name"
        placeholder="Apellido"
        value={formData.last_name}
        onChange={onChange}
        icon={<FiUser />}
        error={errors.last_name}
      />
      <Input
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={onChange}
        icon={<FiMail />}
        error={errors.email}
      />
      <Input
        name="phone_number"
        placeholder="Número de teléfono"
        value={formData.phone_number}
        onChange={onChange}
        icon={<FiPhone />}
        error={errors.phone_number}
      />
    </>
  );
}

export default UserFields;