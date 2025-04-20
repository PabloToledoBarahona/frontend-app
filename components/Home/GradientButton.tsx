'use client';

type Props = {
  label: string;
  onClick?: () => void;
};

export default function GradientButton({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 rounded-full text-white font-semibold shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform"
    >
      {label}
    </button>
  );
}