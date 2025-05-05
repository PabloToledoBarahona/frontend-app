'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import { ProfileCard } from "@/components/User/ProfileCard";
import { FiLogOut } from "react-icons/fi";
import apiClient from "@/lib/apiClient";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await apiClient.get('/users/me'); 
        setUserData(res.data?.data?.user);
      } catch (err) {
        console.error('Error al obtener datos del perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      router.push("/");
    }
  };

  const handleEditProfile = () => router.push('/edit');
  const handleEditEmail = () => router.push('/change-email');
  const handleChangePassword = () => router.push('/change-password');

  return (
    <main className="min-h-screen flex bg-gray-50 ml-64">
      <Sidebar />
      <section className="flex-1 flex items-center justify-center p-6">
        <ProfileCard
          loading={loading}
          userData={userData}
          onEditProfile={handleEditProfile}
          onEditEmail={handleEditEmail}
          onChangePassword={handleChangePassword}
        />
      </section>
    </main>
  );
}