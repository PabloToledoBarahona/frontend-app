'use client';

import { useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import { FileDropzone } from '@/components/Excel/FileDropzone';
import { UploadStatus } from '@/components/Excel/UploadStatus';
import { CSVContentViewer } from '@/components/Excel/CSVContentPreview';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import apiClient from '@/lib/apiClient';

export default function UploadCSVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [csvContent, setCsvContent] = useState<string>('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor, selecciona un archivo CSV.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await apiClient.post('/test/read-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setCsvContent(response.data.content);
      setMessage('Archivo subido con éxito.');
    } catch (error: any) {
      console.error('Error al subir el archivo:', error.response?.data || error.message);
      setMessage('Error al subir el archivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-gray-50 ml-64">
      <Sidebar />

      <div className="flex-1 p-8 flex items-center justify-center">
        <Card className="w-full max-w-4xl p-8 bg-white rounded-3xl shadow-2xl">
          <Heading title="Sube tu archivo CSV" subtitle="Selecciona o arrastra un archivo CSV para analizarlo." center />

          <div className="mt-8">
            <FileDropzone file={file} setFile={setFile} loading={loading} onUpload={handleUpload} />
          </div>

          <div className="mt-6">
            <UploadStatus message={message} />
          </div>

          {csvContent && (
            <div className="mt-6">
              <CSVContentViewer content={csvContent} />
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}