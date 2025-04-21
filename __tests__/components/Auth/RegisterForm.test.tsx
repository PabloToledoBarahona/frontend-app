import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '@/components/Auth/RegisterForm';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/lib/apiClient', () => ({
  get: jest.fn(() => Promise.resolve({ data: { data: [] } })),
  post: jest.fn(() => Promise.resolve({ status: 201, data: { data: { user: { user_id: '123' } } } })),
}));

describe('RegisterForm', () => {
  beforeEach(async () => {
    render(<RegisterForm />);
    await waitFor(() => screen.getByText(/Registro de Usuario/i)); // Evita advertencia de act()
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
    expect(errores.length).toBeGreaterThanOrEqual(3); // mínimo 3 campos requeridos
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
    const passInput = screen.getByPlaceholderText('Contraseña');
    const confirmInput = screen.getByPlaceholderText('Confirmar contraseña');

    fireEvent.change(passInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmInput, { target: { value: 'NoCoinciden123!' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
  });
});