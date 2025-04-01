import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
      <div
        className={`bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg border border-gray-100 ${className}`}
      >
        {children}
      </div>
    );
  }