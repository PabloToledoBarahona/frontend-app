'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';

interface LocationSelectorProps {
  location: {
    country_id: string;
    state_id: string;
    city_id: string;
  };
  onChange: (name: string, value: string) => void;
  errors?: Record<string, string>;
}

export function LocationSelector({ location, onChange, errors }: LocationSelectorProps) {
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await apiClient.get('/location/countries');
        setCountries(res.data.data);
      } catch (error) {
        console.error('Error al cargar países:', error);
      }
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    if (location.country_id) {
      async function fetchStates() {
        try {
          const res = await apiClient.get(`/location/states/${location.country_id}`);
          setStates(res.data.data);
        } catch (error) {
          console.error('Error al cargar estados:', error);
        }
      }
      fetchStates();
    }
  }, [location.country_id]);

  useEffect(() => {
    if (location.state_id) {
      async function fetchCities() {
        try {
          const res = await apiClient.get(`/location/cities/${location.state_id}`);
          setCities(res.data.data);
        } catch (error) {
          console.error('Error al cargar ciudades:', error);
        }
      }
      fetchCities();
    }
  }, [location.state_id]);

  return (
    <div className="space-y-4">
      {/* País */}
      <div>
        <label className="text-sm font-medium text-gray-700">País</label>
        <select
          name="country_id"
          value={location.country_id}
          onChange={(e) => onChange('country_id', e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Selecciona un país</option>
          {countries.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors?.country_id && <p className="text-red-500 text-xs">{errors.country_id}</p>}
      </div>

      {/* Estado */}
      <div>
        <label className="text-sm font-medium text-gray-700">Estado</label>
        <select
          name="state_id"
          value={location.state_id}
          onChange={(e) => onChange('state_id', e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Selecciona un estado</option>
          {states.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        {errors?.state_id && <p className="text-red-500 text-xs">{errors.state_id}</p>}
      </div>

      {/* Ciudad */}
      <div>
        <label className="text-sm font-medium text-gray-700">Ciudad</label>
        <select
          name="city_id"
          value={location.city_id}
          onChange={(e) => onChange('city_id', e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Selecciona una ciudad</option>
          {cities.map((ci) => (
            <option key={ci._id} value={ci._id}>
              {ci.name}
            </option>
          ))}
        </select>
        {errors?.city_id && <p className="text-red-500 text-xs">{errors.city_id}</p>}
      </div>
    </div>
  );
}