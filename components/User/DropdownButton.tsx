'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { MoreVertical, Pencil, Mail, Lock } from 'lucide-react';

interface Props {
  onEditProfile: () => void;
  onEditEmail: () => void;
  onChangePassword: () => void;
}

export function DropdownButton({ onEditProfile, onEditEmail, onChangePassword }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-100 transition">
        <MoreVertical className="h-5 w-5 text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white shadow-xl rounded-xl p-2 w-48">
        <DropdownMenuItem onClick={onEditProfile} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <Pencil className="h-4 w-4 text-gray-500" />
          <span>Editar Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEditEmail} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>Editar Correo</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onChangePassword} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <Lock className="h-4 w-4 text-gray-500" />
          <span>Cambiar Contraseña</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}