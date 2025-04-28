'use client';
import { Button } from "@/components/ui/Button";

interface Props {
  onEditProfile: () => void;
  onEditEmail: () => void;
  onChangePassword: () => void;
}

export function ProfileActions({ onEditProfile, onEditEmail, onChangePassword }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:justify-end gap-4">
      <Button label="Editar Perfil" onClick={onEditProfile} className="w-full md:w-auto" />
      <Button label="Editar Correo" variant="secondary" onClick={onEditEmail} className="w-full md:w-auto" />
      <Button label="Cambiar Contraseña" variant="secondary" onClick={onChangePassword} className="w-full md:w-auto" />
    </div>
  );
}