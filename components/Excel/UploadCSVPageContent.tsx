"use client";

import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import apiClient from "@/lib/apiClient";

export default function UploadCSVPageContent() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [csvContent, setCsvContent] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (
        selectedFile.type !== "text/csv" &&
        !selectedFile.name.endsWith(".csv")
      ) {
        setMessage("Solo se permiten archivos CSV.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setMessage("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Por favor, selecciona un archivo CSV.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await apiClient.post("/test/read-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCsvContent(response.data.content);
      setMessage("Archivo subido con éxito.");
    } catch (error: any) {
      console.error(
        "Error al subir el archivo:",
        error.response?.data || error.message
      );
      setMessage("Error al subir el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl bg-white">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
        Sube tu archivo CSV
      </h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        Selecciona o arrastra un archivo CSV para analizarlo.
      </p>

      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-6"
      >
        <label
          htmlFor="file-upload"
          className="w-full p-10 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 transition cursor-pointer"
        >
          <FiUpload className="text-4xl text-blue-500 mb-4" />
          {file ? (
            <p className="text-sm text-gray-800 font-medium">{file.name}</p>
          ) : (
            <p>Haz clic o arrastra un archivo CSV aquí</p>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          type="submit"
          label={loading ? "Subiendo..." : "Subir Archivo"}
          disabled={loading}
          className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-600"
        />

        {message && (
          <p
            className={`text-center text-sm ${
              message === "Archivo subido con éxito."
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {csvContent && (
          <div className="w-full bg-gray-50 border rounded-lg p-4 mt-4 max-h-80 overflow-auto">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Contenido del CSV:
            </h2>
            <pre className="text-xs text-gray-800 whitespace-pre-wrap">
              {csvContent}
            </pre>
          </div>
        )}
      </form>
    </Card>
  );
}
