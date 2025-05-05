"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

export default function UserProfilePage() {
  const [formData, setFormData] = useState({
    name: "Bruno Sánchez",
    email: "bruno@example.com",
    password: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSave = async () => {
    try {
      setMessage("Actualizado correctamente");
      setEditMode(false);
    } catch (err) {
      setMessage("Error al actualizar");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <Heading
          title="Perfil del Usuario"
          subtitle="Visualiza y edita tu información"
          center
        />

        <div className="space-y-4 mt-6">
          <Input
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            icon={<FiUser />}
            disabled={!editMode}
          />

          <Input
            name="email"
            placeholder="Correo electrónico"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={<FiMail />}
            disabled={!editMode}
          />

          <Input
            name="password"
            placeholder="Nueva contraseña"
            type="password"
            value={formData.password}
            onChange={handleChange}
            icon={<FiLock />}
            disabled={!editMode}
          />
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          {editMode ? (
            <>
              <Button label="Guardar cambios" onClick={handleSave} />
              <Button
                label="Cancelar"
                onClick={() => setEditMode(false)}
                variant="secondary"
              />
            </>
          ) : (
            <Button
              label="Editar información"
              onClick={() => setEditMode(true)}
            />
          )}
        </div>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </Card>
    </div>
  );
}
