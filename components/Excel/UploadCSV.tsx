"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import apiClient from "@/lib/apiClient";
import { FiUpload } from "react-icons/fi";

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [csvContent, setCsvContent] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    
    if (selectedFile) {
      // Verificar si el archivo tiene la extensión .csv
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
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
      console.error("Error al subir el archivo:", error.response?.data || error.message);
      setMessage("Error al subir el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Heading title="Subir Archivo CSV" subtitle="Selecciona un archivo CSV para procesarlo" center />

      <form onSubmit={handleUpload} className="space-y-6 mt-4">
        <div className="relative w-full">
          <input
            type="file"
            accept=".csv"
            id="file-upload"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 text-sm font-semibold rounded-full shadow-md hover:opacity-90 transition cursor-pointer"
          >
            <FiUpload />
            {file ? file.name : "Seleccionar archivo CSV"}
          </label>
        </div>

        <Button
          type="submit"
          label={loading ? "Subiendo..." : "Subir Archivo"}
          disabled={loading}
        />

        {message && (
          <p
            className={`text-sm text-center mt-2 ${message === "Archivo subido con éxito." ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        )}

        {csvContent && (
          <div className="mt-6 p-4 bg-gray-100 border rounded shadow-inner max-h-[300px] overflow-auto">
            <h3 className="font-semibold mb-2 text-sm text-gray-700">Contenido del CSV:</h3>
            <pre className="text-xs whitespace-pre-wrap text-gray-800">{csvContent}</pre>
          </div>
        )}
      </form>
    </Card>
  );
}
