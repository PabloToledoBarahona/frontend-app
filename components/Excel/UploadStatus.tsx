'use client';

interface Props {
  message: string;
}

export function UploadStatus({ message }: Props) {
  if (!message) return null;

  const isSuccess = message.toLowerCase().includes('éxito');

  return (
    <div className={`mt-6 text-center text-sm font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
      {message}
    </div>
  );
}