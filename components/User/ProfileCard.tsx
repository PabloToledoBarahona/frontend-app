'use client';

import { DropdownButton } from '@/components/User/DropdownButton';
import { ProfileHeader } from '@/components/User/ProfileHeader';
import { ProfileDetails } from '@/components/User/ProfileDetails';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

interface Props {
  userData: any;
  loading: boolean;
  onEditProfile: () => void;
  onEditEmail: () => void;
  onChangePassword: () => void;
}

export function ProfileCard({
  userData,
  loading,
  onEditProfile,
  onEditEmail,
  onChangePassword,
}: Props) {
  return (
    <Card className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 relative">
      
      {/* Dropdown de acciones */}
      <div className="absolute top-6 right-6">
        <DropdownButton
          onEditProfile={onEditProfile}
          onEditEmail={onEditEmail}
          onChangePassword={onChangePassword}
        />
      </div>

      {/* Encabezado */}
      <ProfileHeader userData={userData} />

      {/* Detalles o Loading */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <ProfileDetails userData={userData} />
      )}
    </Card>
  );
}