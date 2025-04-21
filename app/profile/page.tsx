'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import Sidebar from '@/components/ui/Sidebar';
import apiClient from '@/lib/apiClient';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  };

  const handleEditProfile = () => {
    router.push('/edit');
  };

  const handleEditEmail = () => {
    router.push('/change-email');
  };

  const handleChangePassword = () => {
    router.push('/change-password');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await apiClient.get('/users/me');
        console.log("Datos del usuario:", res.data?.data?.user);  // Verificar los datos
        setUserData(res.data?.data?.user);
      } catch (err) {
        console.error('Error al obtener datos del perfil:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  

  // Mapeo de campos en inglés a español
  const translations: Record<string, string> = {
    first_name: "Nombre",
    last_name: "Apellido",
    username: "Usuario",
    email: "Correo electrónico",
    date_of_birth: "Fecha de Nacimiento",
    gender: "Género",
    phone_number: "Teléfono",
    bio: "Biografía",
    location: "Ubicación",
    createdAt: "Miembro desde"
  };

  // Traducción de valores de género
  const genderTranslations: Record<string, string> = {
    Female: "Femenino",
    Male: "Masculino",
    Other: "Otro"
  };

  // Función para mostrar la ubicación de forma segura
  const renderLocation = () => {
    if (userData.location) {
      const { city, state, country } = userData.location;
      return `${city || ''}, ${state || ''}, ${country || ''}`;
    }
    return 'Ubicación no disponible';
  };
  

  return (
    <main className="min-h-screen flex bg-gray-50 ml-64">
      <Sidebar />
      
      {/* Logout */}
      <button
        onClick={handleLogout}
        title="Cerrar sesión"
        className="absolute top-6 right-6 text-gray-700 hover:text-black transition duration-300"
      >
        <FiLogOut size={24} />
      </button>

      {/* Contenido del perfil */}
      <section className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full shadow-lg p-6 bg-white rounded-lg">
          <Heading title="Perfil del Usuario" subtitle="Información de tu cuenta" center />

          {loading ? (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          ) : userData ? (
            <div className="mt-6 space-y-6 text-gray-800">
              <div className="flex flex-col space-y-2">
                <div><strong>{translations.first_name}:</strong> {userData.first_name} {userData.last_name}</div>
                <div><strong>{translations.username}:</strong> {userData.username}</div>
                <div><strong>{translations.email}:</strong> {userData.email}</div>
                <div><strong>{translations.date_of_birth}:</strong> {new Date(userData.date_of_birth).toLocaleDateString()}</div>
                <div><strong>{translations.gender}:</strong> {genderTranslations[userData.gender?.charAt(0).toUpperCase() + userData.gender?.slice(1)] || userData.gender}</div>
                <div><strong>{translations.phone_number}:</strong> {userData.phone_number}</div>
                <div><strong>{translations.bio}:</strong> {userData.bio}</div>
                <div><strong>{translations.location}:</strong> {renderLocation()}</div> {/* Mostrar ubicación de manera segura */}
                <div><strong>{translations.createdAt}:</strong> {new Date(userData.createdAt).toLocaleDateString()}</div>
              </div>

              {/* Botones */}
              <div className="pt-6 flex flex-col space-y-4">
                <Button label="Editar Perfil" onClick={handleEditProfile} className="w-full py-3 text-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 rounded-lg" />
                <Button label="Editar Correo Electrónico" onClick={handleEditEmail} className="w-full py-3 text-lg bg-green-600 text-white hover:bg-green-700 transition duration-300 rounded-lg" />
                <Button label="Cambiar Contraseña" onClick={handleChangePassword} className="w-full py-3 text-lg bg-orange-600 text-white hover:bg-orange-700 transition duration-300 rounded-lg" />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">No se pudo cargar la información del perfil.</p>
          )}
        </Card>
      </section>
    </main>
  );
}
