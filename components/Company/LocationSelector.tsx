'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';

interface Location {
  _id: string;
  name: string;
}

interface Props {
  location: {
    country_id: string;
    state_id: string;
    city_id: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function LocationSelector({ location, onChange, errors }: Props) {
  const [countries, setCountries] = useState<Location[]>([]);
  const [states, setStates] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);

  useEffect(() => {
    apiClient
      .get('/location/countries')
      .then((res) => setCountries(res.data.data))
      .catch((err) => console.error('Error al obtener países:', err));
  }, []);

  useEffect(() => {
    if (location.country_id) {
      apiClient
        .get(`/location/states/${location.country_id}`)
        .then((res) => setStates(res.data.data))
        .catch((err) => console.error('Error al obtener estados:', err));
    } else {
      setStates([]);
      setCities([]);
    }
  }, [location.country_id]);

  useEffect(() => {
    if (location.state_id) {
      apiClient
        .get(`/location/cities/${location.state_id}`)
        .then((res) => setCities(res.data.data))
        .catch((err) => console.error('Error al obtener ciudades:', err));
    } else {
      setCities([]);
    }
  }, [location.state_id]);

  const renderSelect = (
    label: string,
    value: string,
    options: Location[],
    onChangeHandler: (value: string) => void,
    error?: string,
    disabled = false,
    placeholder = 'Selecciona una opción'
  ) => (
    <div>
      <label className="text-sm text-gray-600 font-medium block mb-1">{label}</label>
      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      {renderSelect(
        'País',
        location.country_id,
        countries,
        (value) => onChange('country_id', value),
        errors?.country_id,
        false,
        'Selecciona un país'
      )}
      {renderSelect(
        'Estado',
        location.state_id,
        states,
        (value) => onChange('state_id', value),
        errors?.state_id,
        !location.country_id,
        'Selecciona un estado'
      )}
      {renderSelect(
        'Ciudad',
        location.city_id,
        cities,
        (value) => onChange('city_id', value),
        errors?.city_id,
        !location.state_id,
        'Selecciona una ciudad'
      )}
    </div>
  );
}