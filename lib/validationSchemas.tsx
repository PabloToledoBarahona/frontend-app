import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  first_name: z.string().min(1, 'El nombre es obligatorio'),
  last_name: z.string().min(1, 'El apellido es obligatorio'),
  date_of_birth: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: 'Fecha de nacimiento inválida' }
  ),
  gender: z.enum(['Male', 'Female', 'Other'], {
    errorMap: () => ({ message: 'Selecciona un género válido' })
  }),
  bio: z.string().max(500, 'La biografía no puede superar los 500 caracteres'),
  phone_number: z.string().min(6, 'Número de teléfono inválido'),
  location: z.object({
    country_id: z.string().min(1, 'El país es obligatorio'),
    state_id: z.string().min(1, 'El estado es obligatorio'),
    city_id: z.string().min(1, 'La ciudad es obligatoria'),
  }),
});
