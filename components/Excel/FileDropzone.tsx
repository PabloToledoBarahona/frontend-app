'use client';

import { FiUploadCloud } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  loading: boolean;
  onUpload: () => void;
}

export function FileDropzone({ file, setFile, loading, onUpload }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        alert('Solo se permiten archivos CSV.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50 hover:bg-gray-100 transition">
      
      {/* Dropzone area */}
      <label
        htmlFor="csv-file-upload"
        className="flex flex-col items-center space-y-2 cursor-pointer"
      >
        <FiUploadCloud size={48} className="text-blue-500" />
        <span className="text-gray-600 text-sm font-medium">
          {file ? file.name : 'Haz clic o arrastra un archivo CSV aquí'}
        </span>
      </label>
      <input
        id="csv-file-upload"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload button */}
      <Button
        label={loading ? 'Subiendo...' : 'Subir Archivo'}
        className="mt-6 w-40"
        disabled={!file || loading}
        onClick={onUpload}
        type="button"
      />
    </div>
  );
}