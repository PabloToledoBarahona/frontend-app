"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import apiClient from "@/lib/apiClient";

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [csvContent, setCsvContent] = useState<string>("");

  // Maneja la selección del archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Validar que el archivo sea un CSV
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        setMessage("Error: Solo se permiten archivos CSV.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setMessage("");
    }
  };

  // Maneja la subida del archivo al backend
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
      const response = await apiClient.post("/api/v1/test/read-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Archivo subido correctamente:", response.data);
      setCsvContent(response.data.content);
      setMessage("Archivo subido con éxito.");
    } catch (error: any) {
      console.error("Error al subir el archivo:", error.response?.data || error.message);
      setMessage("Error al subir el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Heading title="Subir Archivo CSV" subtitle="Selecciona un archivo CSV para procesarlo" center />

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="relative">
          {/* Ocultar el input original de tipo file */}
          <input
            type="file"
            accept=".csv"
            id="file-upload"
            onChange={handleFileChange}
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
          />
          {/* Botón personalizado para seleccionar el archivo */}
          <label
            htmlFor="file-upload"
            className="block text-gray-700 bg-blue-500 text-white px-6 py-2.5 text-sm font-semibold rounded-full shadow-md hover:opacity-90 transition cursor-pointer"
          >
            {file ? file.name : "Seleccionar archivo CSV"}
          </label>
        </div>

        <Button type="submit" label={loading ? "Subiendo..." : "Subir Archivo"} disabled={!file || loading} />

        {message && (
          <p
            className={`text-sm text-center mt-2 ${
              message === "Archivo subido con éxito." ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {csvContent && (
          <div className="mt-4 p-2 bg-gray-100 border rounded">
            <h3 className="font-semibold">Contenido del CSV:</h3>
            <pre className="text-xs whitespace-pre-wrap">{csvContent}</pre>
          </div>
        )}
      </form>
    </Card>
  );
}
