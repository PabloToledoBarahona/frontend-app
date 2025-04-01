import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyle = `w-full py-2 px-4 rounded-lg font-semibold transition duration-200 shadow-md`;
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  return (
    <button {...props} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {label}
    </button>
  );
}