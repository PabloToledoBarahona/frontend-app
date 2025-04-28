'use client';
import React from 'react';

interface Props {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export function ProfileItem({ label, value, icon }: Props) {
  return (
    <div className="flex flex-col border-b border-gray-200 pb-3">
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <p className="text-gray-800 text-sm break-words">{value}</p>
    </div>
  );
}