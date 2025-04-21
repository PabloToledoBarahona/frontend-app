import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChannelFormModal from '@/components/Channels/ChannelFormModal';
import apiClient from '@/lib/apiClient';

jest.mock('@/lib/apiClient', () => ({
  post: jest.fn(),
}));

describe('ChannelFormModal', () => {
  const onCloseMock = jest.fn();
  const onCreatedMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza campos y botón de cierre', () => {
    render(<ChannelFormModal onClose={onCloseMock} onCreated={onCreatedMock} />);
  
    expect(screen.getByRole('heading', { name: /crear canal/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/título del canal/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear canal/i })).toBeInTheDocument();
  
    const allButtons = screen.getAllByRole('button');
    expect(allButtons).toHaveLength(2); 
  });

  it('muestra error si los campos están vacíos', async () => {
    render(<ChannelFormModal onClose={onCloseMock} onCreated={onCreatedMock} />);

    fireEvent.click(screen.getByRole('button', { name: /crear canal/i }));

    await waitFor(() => {
      expect(screen.getByText(/completa todos los campos/i)).toBeInTheDocument();
    });
  });

  it('envía los datos y cierra el modal correctamente', async () => {
    (apiClient.post as jest.Mock).mockResolvedValueOnce({});

    render(<ChannelFormModal onClose={onCloseMock} onCreated={onCreatedMock} />);

    fireEvent.change(screen.getByPlaceholderText(/título del canal/i), {
      target: { value: 'Canal Modal' },
    });
    fireEvent.change(screen.getByPlaceholderText(/descripción/i), {
      target: { value: 'Desde modal' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear canal/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/channel/create', {
        title: 'Canal Modal',
        description: 'Desde modal',
      });
      expect(screen.getByText(/canal creado exitosamente/i)).toBeInTheDocument();
      expect(onCreatedMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('muestra mensaje de error si la petición falla', async () => {
    (apiClient.post as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          data: {
            error: [{ message: 'Error del backend desde modal' }],
          },
        },
      },
    });

    render(<ChannelFormModal onClose={onCloseMock} onCreated={onCreatedMock} />);

    fireEvent.change(screen.getByPlaceholderText(/título del canal/i), {
      target: { value: 'Error' },
    });
    fireEvent.change(screen.getByPlaceholderText(/descripción/i), {
      target: { value: 'Falla' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear canal/i }));

    await waitFor(() => {
      expect(screen.getByText(/error del backend desde modal/i)).toBeInTheDocument();
    });
  });

  it('cierra el modal al hacer clic en el botón X', () => {
    render(<ChannelFormModal onClose={onCloseMock} onCreated={onCreatedMock} />);

    // el primer botón renderizado es el de cerrar
    const closeButton = screen.getAllByRole('button')[0];
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});