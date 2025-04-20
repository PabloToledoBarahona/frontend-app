import React from 'react';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function Heading({ title, subtitle, center = false }: HeadingProps) {
  return (
    <div className={`mb-6 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
}