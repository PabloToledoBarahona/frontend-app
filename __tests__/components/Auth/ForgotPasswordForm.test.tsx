import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const postMock = jest.fn();
jest.mock('@/lib/apiClient', () => ({
  post: (...args: any[]) => postMock(...args),
}));

describe('ForgotPasswordForm', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    postMock.mockReset();
    pushMock.mockReset();
  });

  it('debe renderizar el título correctamente', () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByText(/¿Olvidaste tu contraseña\?/i)).toBeInTheDocument();
  });

  it('debe mostrar error si el email está vacío', async () => {
    render(<ForgotPasswordForm />);
    fireEvent.click(screen.getByRole('button', { name: /Enviar código/i }));
    expect(await screen.findByText(/Correo inválido/i)).toBeInTheDocument();
  });

  it('debe mostrar error si el email es incorrecto', async () => {
    render(<ForgotPasswordForm />);
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'correo-mal' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enviar código/i }));
    expect(await screen.findByText(/Correo inválido/i)).toBeInTheDocument();
  });

  it('debe deshabilitar el botón durante envío', async () => {
    postMock.mockResolvedValueOnce({ data: { data: { message: 'Revisa tu correo' } } });

    render(<ForgotPasswordForm />);
    const button = screen.getByRole('button', { name: /Enviar código/i });
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'pablo@test.com' },
    });
    fireEvent.click(button);

    await waitFor(() => expect(button).toBeDisabled());
  });

  it('debe mostrar mensaje de éxito y botón para redirigir', async () => {
    postMock.mockResolvedValueOnce({ data: { data: { message: 'Revisa tu bandeja' } } });

    render(<ForgotPasswordForm />);
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'pablo@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enviar código/i }));

    await waitFor(() => {
      expect(screen.getByText(/¡Revisa tu correo!/i)).toBeInTheDocument();
      expect(screen.getByText(/Revisa tu bandeja/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Restablecer contraseña/i }));
    expect(pushMock).toHaveBeenCalledWith('/reset-password');
  });

  it('debe mostrar error si el backend responde con error', async () => {
    postMock.mockRejectedValueOnce({
      response: {
        data: {
          data: {
            error: [{ message: 'Correo no registrado' }],
          },
        },
      },
    });

    render(<ForgotPasswordForm />);
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'noexiste@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enviar código/i }));

    await waitFor(() => {
      expect(screen.getByText(/Correo no registrado/i)).toBeInTheDocument();
    });
  });
});