'use client';

import clsx from 'clsx';

type Props = {
  countries: any[];
  states: any[];
  cities: any[];
  formData: {
    country_id?: string;
    state_id?: string;
    city_id?: string;
  };
  errors: Partial<Record<string, string>>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function LocationSelector({ countries, states, cities, formData, errors, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* País */}
      <select
        name="country_id"
        value={formData.country_id}
        onChange={onChange}
        className={clsx(
          'p-3 rounded-lg border bg-white transition focus:outline-none focus:ring-2 focus:ring-blue-500',
          errors.country_id ? 'border-red-500' : 'border-gray-300'
        )}
      >
        <option value="">País</option>
        {countries.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Departamento */}
      <select
        name="state_id"
        value={formData.state_id}
        onChange={onChange}
        disabled={!states.length}
        className={clsx(
          'p-3 rounded-lg border bg-white transition focus:outline-none focus:ring-2 focus:ring-blue-500',
          errors.state_id ? 'border-red-500' : 'border-gray-300',
          !states.length && 'opacity-60 cursor-not-allowed'
        )}
      >
        <option value="">Departamento</option>
        {states.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Ciudad */}
      <select
        name="city_id"
        value={formData.city_id}
        onChange={onChange}
        disabled={!cities.length}
        className={clsx(
          'p-3 rounded-lg border bg-white transition focus:outline-none focus:ring-2 focus:ring-blue-500',
          errors.city_id ? 'border-red-500' : 'border-gray-300',
          !cities.length && 'opacity-60 cursor-not-allowed'
        )}
      >
        <option value="">Ciudad</option>
        {cities.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Error */}
      {errors.city_id && (
        <p className="text-sm text-red-600 col-span-3">{errors.city_id}</p>
      )}
    </div>
  );
}

export default LocationSelector;