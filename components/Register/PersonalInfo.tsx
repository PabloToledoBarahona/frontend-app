'use client';

import { useState } from 'react';
import { parseDate } from '@internationalized/date';
import clsx from 'clsx';

type Props = {
  date_of_birth?: string;
  gender?: string;
  errors: Partial<Record<string, string>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onDateChange: (value: string) => void;
};

function PersonalInfo({ date_of_birth, gender, errors, onChange, onDateChange }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Date Picker manual (estilo Apple simplificado) */}
      <div className="relative">
        <input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          value={date_of_birth || ''}
          onChange={(e) => onDateChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={clsx(
            'w-full p-3 rounded-lg border bg-white',
            focused ? 'border-blue-500 shadow-md' : 'border-gray-300',
            errors.date_of_birth && 'border-red-500'
          )}
        />
        {errors.date_of_birth && (
          <p className="text-sm text-red-600 mt-1">{errors.date_of_birth}</p>
        )}
      </div>

      {/* Select de género */}
      <div>
        <select
          name="gender"
          value={gender || ''}
          onChange={onChange}
          className={clsx(
            'w-full p-3 rounded-lg border bg-white',
            errors.gender ? 'border-red-500' : 'border-gray-300'
          )}
        >
          <option value="">Selecciona género</option>
          <option value="female">Femenino</option>
          <option value="male">Masculino</option>
          <option value="other">Otro</option>
        </select>
        {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
      </div>
    </div>
  );
}

export default PersonalInfo;