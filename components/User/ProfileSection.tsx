'use client';

import { ReactNode } from 'react';

interface ProfileSectionProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function ProfileSection({ icon, label, value }: ProfileSectionProps) {
  return (
    <div className="flex flex-col justify-between h-full px-2 py-2 border-b md:border-b-0">
      <div className="flex items-center gap-2 text-gray-500 mb-1">
        <span className="text-blue-500">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <div className="text-gray-800 text-sm break-words">
        {value}
      </div>
    </div>
  );
}