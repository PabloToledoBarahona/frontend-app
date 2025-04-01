import React from 'react';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function Heading({ title, subtitle, center = false }: {
    title: string;
    subtitle?: string;
    center?: boolean;
  }) {
    return (
      <div className={`mb-8 ${center ? 'text-center' : ''}`}>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
    );
  }