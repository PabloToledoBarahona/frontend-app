import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyle = `w-full py-3 px-6 rounded-full font-semibold transition duration-200 shadow-lg text-sm`;
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  };

  return (
    <button {...props} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {label}
    </button>
  );
}