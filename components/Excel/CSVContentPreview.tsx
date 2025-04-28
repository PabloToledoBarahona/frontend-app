'use client';

interface Props {
  content: string;
}

export function CSVContentViewer({ content }: Props) {
  if (!content) return null;

  return (
    <div className="mt-8 w-full bg-gray-100 border border-gray-200 rounded-2xl p-6 shadow-inner overflow-x-auto max-h-[400px]">
      <h3 className="text-base font-semibold text-gray-700 mb-4">Contenido del Archivo CSV</h3>
      <pre className="text-sm text-gray-800 whitespace-pre-wrap">{content}</pre>
    </div>
  );
}