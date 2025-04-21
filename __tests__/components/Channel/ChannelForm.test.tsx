import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChannelForm from '@/components/Channels/ChannelForm';
import apiClient from '@/lib/apiClient';

jest.mock('@/lib/apiClient', () => ({
  post: jest.fn(),
}));

describe('ChannelForm', () => {
  const onSuccessMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza título, campos y botón', () => {
    render(<ChannelForm onSuccess={onSuccessMock} />);

    expect(screen.getByRole('heading', { name: /crear canal/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/título del canal/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear canal/i })).toBeInTheDocument();
  });

  it('muestra error si los campos están vacíos', async () => {
    render(<ChannelForm onSuccess={onSuccessMock} />);

    fireEvent.click(screen.getByRole('button', { name: /crear canal/i }));

    await waitFor(() => {
      expect(screen.getByText(/completa todos los campos/i)).toBeInTheDocument();
    });
  });

  it('envía los datos al backend correctamente y muestra éxito', async () => {
    (apiClient.post as jest.Mock).mockResolvedValueOnce({});

    render(<ChannelForm onSuccess={onSuccessMock} />);

    fireEvent.change(screen.getByPlaceholderText(/título del canal/i), {
      target: { value: 'Test Channel' },
    });

    fireEvent.change(screen.getByPlaceholderText(/descripción/i), {
      target: { value: 'Canal de prueba' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear canal/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/channel/create', {
        title: 'Test Channel',
        description: 'Canal de prueba',
      });

      expect(screen.getByText(/canal creado exitosamente/i)).toBeInTheDocument();
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  it('muestra mensaje de error si el backend falla', async () => {
    (apiClient.post as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          data: {
            error: [{ message: 'Error del backend' }],
          },
        },
      },
    });

    render(<ChannelForm onSuccess={onSuccessMock} />);

    fireEvent.change(screen.getByPlaceholderText(/título del canal/i), {
      target: { value: 'Fallido' },
    });

    fireEvent.change(screen.getByPlaceholderText(/descripción/i), {
      target: { value: 'Error' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear canal/i }));

    await waitFor(() => {
      expect(screen.getByText(/error del backend/i)).toBeInTheDocument();
    });
  });
});