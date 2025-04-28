'use client';

import { ReactNode } from 'react';

interface ProfileSectionProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function ProfileSection({ icon, label, value }: ProfileSectionProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center text-gray-500 mb-1 space-x-2">
        <span className="text-blue-500">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <div className="text-gray-800 text-base font-medium">{value}</div>
      <div className="mt-2 border-b border-gray-200" />
    </div>
  );
}