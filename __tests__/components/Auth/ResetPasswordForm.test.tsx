import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => key === 'otp' ? '123456' : null,
  }),
}));

const postMock = jest.fn();
jest.mock('@/lib/apiClient', () => ({
  post: (...args: any[]) => postMock(...args),
}));

describe('ResetPasswordForm', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  beforeEach(() => {
    postMock.mockReset();
    render(<ResetPasswordForm />);
  });

  it('muestra título y campos del formulario', () => {
    expect(screen.getByText(/Restablecer contraseña/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Código de verificación')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nueva contraseña')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar nueva contraseña')).toBeInTheDocument();
  });

  it('muestra errores de validación si se envía vacío', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Cambiar contraseña/i }));

    await waitFor(() => {
      expect(screen.getByText(/Correo inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/Mínimo 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('muestra mensaje de error del backend', async () => {
    postMock.mockRejectedValueOnce({
      response: {
        data: {
          data: {
            error: [{ message: 'Código incorrecto' }],
          },
        },
      },
    });

    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
      target: { value: 'pablo@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Código de verificación'), {
      target: { value: '000000' },
    });
    fireEvent.change(screen.getByPlaceholderText('Nueva contraseña'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar nueva contraseña'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cambiar contraseña/i }));

    await waitFor(() => {
      expect(screen.getByText(/Código incorrecto/i)).toBeInTheDocument();
    });
  });

  it('muestra mensaje de éxito y redirige a login', async () => {
    jest.useFakeTimers();

    postMock.mockResolvedValueOnce({
      data: { data: { message: 'Contraseña cambiada correctamente' } },
    });

    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
      target: { value: 'pablo@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Código de verificación'), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByPlaceholderText('Nueva contraseña'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar nueva contraseña'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cambiar contraseña/i }));

    await waitFor(() => {
      expect(screen.getByText(/Contraseña cambiada correctamente/i)).toBeInTheDocument();
    });

    jest.advanceTimersByTime(2500);
    expect(window.location.href).toBe('/login');
    jest.useRealTimers();
  });
});