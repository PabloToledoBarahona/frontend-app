'use client';
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <Card className="max-w-xl w-full text-center space-y-6 p-8 shadow-2xl border border-gray-800">
        <Heading
          title="Bienvenido a TeLoCobro"
          subtitle="Tu sistema de gestión eficiente y profesional"
          center
        />
        <Button label="Iniciar sesión" onClick={() => (window.location.href = "/login")} />
        <p className="text-sm text-gray-400">
          ¿Aún no tienes cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </Card>
    </main>
  );
}