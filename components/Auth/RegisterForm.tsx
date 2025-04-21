"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

type User = {
  username?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  date_of_birth?: string;
  gender?: string;
  bio?: string;
  country_id?: string;
  state_id?: string;
  city_id?: string;
};

export default function RegisterForm() {
  const router = useRouter();

  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [formData, setFormData] = useState<User>({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    date_of_birth: "",
    gender: "",
    bio: "",
    country_id: "",
    state_id: "",
    city_id: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await apiClient.get("/location/countries");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country_id) return;
      try {
        const response = await apiClient.get(
          `/location/states/${formData.country_id}`
        );
        setStates(response.data.data);
        setCities([]);
        setFormData((prev) => ({ ...prev, state_id: "", city_id: "" }));
      } catch (error) {
        console.error("Error al cargar estados:", error);
      }
    };
    fetchStates();
  }, [formData.country_id]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state_id) return;
      try {
        const response = await apiClient.get(
          `/location/cities/${formData.state_id}`
        );
        setCities(response.data.data);
        setFormData((prev) => ({ ...prev, city_id: "" }));
      } catch (error) {
        console.error("Error al cargar ciudades:", error);
      }
    };
    fetchCities();
  }, [formData.state_id]);

  const validate = () => {
    const newErrors: Partial<User> = {};

    if (!formData.username) newErrors.username = "Campo requerido";
    if (!formData.first_name) newErrors.first_name = "Campo requerido";
    if (!formData.last_name) newErrors.last_name = "Campo requerido";

    if (!formData.phone_number || !/^\d{7,15}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Teléfono inválido (solo números)";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }

    if (!formData.date_of_birth) newErrors.date_of_birth = "Campo requerido";

    if (!formData.gender) newErrors.gender = "Campo requerido";
    if (!formData.city_id) newErrors.city_id = "Campo requerido";

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Debe incluir una mayúscula";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Debe incluir una minúscula";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Debe incluir un número";
    } else if (
      !/[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]/.test(formData.password)
    ) {
      newErrors.password = "Debe incluir un carácter especial";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const { country_id, state_id, city_id, ...rest } = formData;
      const dataToSend = { ...rest, location: { city_id } };
      const response = await apiClient.post("/auth/sign-up", dataToSend);

      if (response.status === 200 || response.status === 201) {
        const { user_id } = response.data.data.user;
        router.push(
          `/confirm-account?email=${formData.email}&user_id=${user_id}`
        );
      } else {
        setMessage("Ocurrió un error inesperado.");
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.data?.error?.[0]?.message ||
        "Error al registrar.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card className="p-8 shadow-xl rounded-2xl bg-white space-y-6">
        <Heading
          title="Registro de Usuario"
          subtitle="Crea tu cuenta para comenzar"
          center
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            icon={<FiUser />}
            error={errors.username}
          />
          <Input
            name="first_name"
            placeholder="Nombre"
            value={formData.first_name}
            onChange={handleChange}
            icon={<FiUser />}
            error={errors.first_name}
          />
          <Input
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            icon={<FiUser />}
            error={errors.last_name}
          />
          <Input
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            icon={<FiMail />}
            error={errors.email}
          />
          <Input
            name="phone_number"
            placeholder="Número de teléfono"
            value={formData.phone_number}
            onChange={handleChange}
            icon={<FiPhone />}
            error={errors.phone_number}
          />

          <div className="relative">
            <input
              type="date"
              name="date_of_birth"
              aria-label="Fecha de nacimiento"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
            />
            {errors.date_of_birth && (
              <p className="text-sm text-red-600">{errors.date_of_birth}</p>
            )}
          </div>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            aria-label="Género"
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
          >
            <option value="">Selecciona género</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="other">Otro</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender}</p>
          )}

          <textarea
            name="bio"
            placeholder="Biografía"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
            maxLength={280}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="country_id"
              value={formData.country_id}
              onChange={handleChange}
              aria-label="País"
              className="p-3 rounded-lg bg-gray-50 border border-gray-300"
            >
              <option value="">País</option>
              {countries.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
              disabled={!states.length}
              aria-label="Departamento"
              className="p-3 rounded-lg bg-gray-50 border border-gray-300"
            >
              <option value="">Departamento</option>
              {states.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              disabled={!cities.length}
              aria-label="Ciudad"
              className="p-3 rounded-lg bg-gray-50 border border-gray-300"
            >
              <option value="">Ciudad</option>
              {cities.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {errors.city_id && (
            <p className="text-sm text-red-600">{errors.city_id}</p>
          )}

          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            icon={<FiLock />}
            error={errors.password}
          />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirmar contraseña"
            value={formData.confirm_password}
            onChange={handleChange}
            icon={<FiLock />}
            error={errors.confirm_password}
          />

          <Button
            type="submit"
            label={loading ? "Registrando..." : "Registrarse"}
            disabled={loading}
            className="w-full"
          />
          {message && (
            <p className="text-sm text-center mt-2 text-red-600">{message}</p>
          )}
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Inicia sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}
