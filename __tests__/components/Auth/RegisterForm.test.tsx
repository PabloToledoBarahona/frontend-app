import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '@/components/Auth/RegisterForm';
import '@testing-library/jest-dom';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock('@/lib/apiClient', () => ({
  get: jest.fn((url) => {
    if (url === '/location/countries') {
      return Promise.resolve({ data: { data: [{ _id: '1', name: 'Bolivia' }] } });
    }
    if (url === '/location/states/1') {
      return Promise.resolve({ data: { data: [{ _id: '2', name: 'Santa Cruz' }] } });
    }
    if (url === '/location/cities/2') {
      return Promise.resolve({ data: { data: [{ _id: '3', name: 'SCZ Ciudad' }] } });
    }
    return Promise.resolve({ data: { data: [] } });
  }),
  post: jest.fn(() => Promise.resolve({ status: 201, data: { data: { user: { user_id: '123' } } } })),
}));

describe('RegisterForm', () => {
  beforeEach(async () => {
    render(<RegisterForm />);
    await waitFor(() => screen.getByText(/Registro de Usuario/i));
  });

  it('debe mostrar el título del formulario', () => {
    expect(screen.getByText(/Registro de Usuario/i)).toBeInTheDocument();
  });

  it('debe mostrar el botón de registro', () => {
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('debe mostrar múltiples errores si se envía vacío', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    const errores = await screen.findAllByText(/Campo requerido/i);
    expect(errores.length).toBeGreaterThanOrEqual(3);
  });

  it('debe mostrar error si el email es inválido', () => {
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'correo-mal' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    expect(screen.getByText(/Correo inválido/i)).toBeInTheDocument();
  });

  it('debe mostrar error si el teléfono es inválido', () => {
    fireEvent.change(screen.getByPlaceholderText(/Número de teléfono/i), {
      target: { value: 'abc123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    expect(screen.getByText(/Teléfono inválido/i)).toBeInTheDocument();
  });

  it('debe mostrar error si las contraseñas no coinciden', () => {
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), {
      target: { value: 'NoCoinciden123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  it('debe mostrar error si la contraseña no incluye mayúscula', () => {
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    expect(screen.getByText(/Debe incluir una mayúscula/i)).toBeInTheDocument();
  });

  it('debe actualizar los campos al escribir', () => {
    const input = screen.getByPlaceholderText('Nombre de usuario') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test123' } });
    expect(input.value).toBe('test123');
  });

  it('debe deshabilitar el botón de registro durante envío', async () => {
    const button = screen.getByRole('button', { name: /Registrarse/i });

    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByPlaceholderText('Apellido'), { target: { value: 'Pérez' } });
    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'test@correo.com' } });
    fireEvent.change(screen.getByPlaceholderText('Número de teléfono'), { target: { value: '70012345' } });
    fireEvent.change(screen.getByPlaceholderText('Biografía'), { target: { value: 'Soy dev' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/género/i), { target: { value: 'male' } });

    // Simula selección de ciudad
    fireEvent.change(screen.getByLabelText(/país/i), { target: { value: '1' } });
    await waitFor(() => screen.getByLabelText(/departamento/i));
    fireEvent.change(screen.getByLabelText(/departamento/i), { target: { value: '2' } });
    await waitFor(() => screen.getByLabelText(/ciudad/i));
    fireEvent.change(screen.getByLabelText(/ciudad/i), { target: { value: '3' } });

    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText(/Registrando/i)).toBeInTheDocument());
  });

  it('debe enviar el formulario correctamente y redirigir', async () => {
    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'pablo123' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Pablo' } });
    fireEvent.change(screen.getByPlaceholderText('Apellido'), { target: { value: 'Toledo' } });
    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'pablo@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Número de teléfono'), { target: { value: '70012345' } });
    fireEvent.change(screen.getByPlaceholderText('Biografía'), { target: { value: 'Hola soy Pablo' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/género/i), { target: { value: 'male' } });

    // Simula selección de ciudad
    fireEvent.change(screen.getByLabelText(/país/i), { target: { value: '1' } });
    await waitFor(() => screen.getByLabelText(/departamento/i));
    fireEvent.change(screen.getByLabelText(/departamento/i), { target: { value: '2' } });
    await waitFor(() => screen.getByLabelText(/ciudad/i));
    fireEvent.change(screen.getByLabelText(/ciudad/i), { target: { value: '3' } });

    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), {
      target: { value: 'Password123!' },
    });

    const button = screen.getByRole('button', { name: /Registrarse/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/confirm-account?email=pablo@test.com&user_id=123');
    });
  });
});