'use client';

import Image from 'next/image';
import DefaultAvatar from '@/public/default-avatar.png';

interface ProfileHeaderProps {
  userData: any;
}

export function ProfileHeader({ userData }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <Image
        src={DefaultAvatar}
        alt="Avatar"
        width={100}
        height={100}
        className="rounded-full border border-gray-300"
      />
      <h2 className="mt-4 text-xl font-semibold text-gray-800">
        {userData?.first_name} {userData?.last_name}
      </h2>
      <p className="text-gray-500 text-sm">{userData?.email}</p>
    </div>
  );
}