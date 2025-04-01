import React from 'react';

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1f2937] p-10 rounded-2xl shadow-2xl w-full max-w-md">
      {children}
    </div>
  );
}