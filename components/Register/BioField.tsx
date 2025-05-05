'use client';

type Props = {
  bio?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function BioField({ bio, onChange }: Props) {
  return (
    <textarea
      name="bio"
      placeholder="Biografía"
      value={bio || ''}
      onChange={onChange}
      className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      maxLength={280}
    />
  );
}

export default BioField;