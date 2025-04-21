import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/Auth/LoginForm';
import '@testing-library/jest-dom';

const onSuccessMock = jest.fn();

jest.mock('@/lib/apiClient', () => ({
  post: jest.fn((url, data) => {
    if (url === '/auth/sign-in') {
      if (data.email === 'pablo@test.com' && data.password === '123456') {
        return Promise.resolve({
          data: { data: { authToken: 'mock-token' } },
        });
      } else if (data.email === 'no-token@test.com') {
        return Promise.resolve({
          data: { data: {} }, // sin token
        });
      } else if (data.email === 'sin-estructura@test.com') {
        return Promise.reject({}); // estructura inesperada
      } else {
        return Promise.reject({
          response: {
            data: {
              data: {
                error: [{ message: 'Credenciales incorrectas' }],
              },
            },
          },
        });
      }
    }
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    render(<LoginForm onSuccess={onSuccessMock} />);
    onSuccessMock.mockClear();
    localStorage.clear();
  });

  it('debe mostrar el título del formulario', () => {
    const headings = screen.getAllByText(/Iniciar Sesión/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  it('debe mostrar los campos y el botón', () => {
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it('debe mostrar error si los campos están vacíos', () => {
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
    expect(screen.getByText('Correo inválido')).toBeInTheDocument();
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
  });

  it('debe mostrar error si el email es inválido', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'correo-mal' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    const error = await screen.findByText('Correo inválido');
    expect(error).toBeInTheDocument();
  });

  it('debe deshabilitar el botón durante envío', async () => {
    const button = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'pablo@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(button);
    await waitFor(() => expect(button).toBeDisabled());
  });

  it('debe guardar el token y llamar a onSuccess si todo sale bien', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'pablo@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: '123456' },
    });

    const button = screen.getByRole('button', { name: /Iniciar Sesión/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('authToken')).toBe('mock-token');
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  it('debe mostrar mensaje de error si el backend responde con error', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'malo@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'incorrecta' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    const error = await screen.findByText('Credenciales incorrectas');
    expect(error).toBeInTheDocument();
  });

  it('debe mostrar mensaje si no se recibe token', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'no-token@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    const error = await screen.findByText(/Token no recibido/i);
    expect(error).toBeInTheDocument();
  });

  it('debe mostrar error genérico si el backend no responde con estructura esperada', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'sin-estructura@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    const error = await screen.findByText(/Credenciales incorrectas/i);
    expect(error).toBeInTheDocument();
  });
});