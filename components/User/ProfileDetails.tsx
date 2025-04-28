'use client';

import { ProfileSection } from '@/components/User/ProfileSection';
import { FiUser, FiMail, FiCalendar, FiPhone, FiMapPin, FiInfo } from 'react-icons/fi';

interface ProfileDetailsProps {
  userData: any;
}

export function ProfileDetails({ userData }: ProfileDetailsProps) {
  const {
    username,
    email,
    date_of_birth,
    phone_number,
    bio,
    location,
  } = userData || {};

  const formattedDate = date_of_birth ? new Date(date_of_birth).toLocaleDateString() : 'No disponible';
  const formattedLocation = location?.city && location?.state && location?.country
    ? `${location.city}, ${location.state}, ${location.country}`
    : 'No disponible';

  return (
    <div className="flex flex-col space-y-6 mt-8">

      {/* Fila 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection
          icon={<FiUser />}
          label="Usuario"
          value={username || 'No disponible'}
        />
        <ProfileSection
          icon={<FiCalendar />}
          label="Fecha de nacimiento"
          value={formattedDate}
        />
      </div>

      {/* Fila 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection
          icon={<FiMail />}
          label="Correo"
          value={email || 'No disponible'}
        />
        <ProfileSection
          icon={<FiPhone />}
          label="Teléfono"
          value={phone_number || 'No disponible'}
        />
      </div>

      {/* Fila 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection
          icon={<FiInfo />}
          label="Biografía"
          value={bio || 'No disponible'}
        />
        <ProfileSection
          icon={<FiMapPin />}
          label="Ubicación"
          value={formattedLocation}
        />
      </div>

    </div>
  );
}