import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ChannelList from '@/components/Channels/ChannelList';
import apiClient from '@/lib/apiClient';

jest.mock('@/lib/apiClient');

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
  }));

const mockChannels = [
  {
    _id: '1',
    title: 'Canal A',
    description: 'Descripción A',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'Canal B',
    description: 'Descripción B',
    createdAt: '2024-02-02T00:00:00.000Z',
  },
];

describe('ChannelList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza título y botón para crear canal', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({
      data: { data: { channels: [] } },
    });

    render(<ChannelList />);
    expect(screen.getByText(/Mis canales/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear canal/i })).toBeInTheDocument();
  });

  it('muestra los canales devueltos por la API', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({
      data: { data: { channels: mockChannels } },
    });

    render(<ChannelList />);
    await waitFor(() => {
      expect(screen.getByText(/Canal A/i)).toBeInTheDocument();
      expect(screen.getByText(/Descripción A/i)).toBeInTheDocument();
      expect(screen.getByText(/Canal B/i)).toBeInTheDocument();
    });
  });

  it('muestra mensaje de error si la API falla', async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    render(<ChannelList />);
    await waitFor(() => {
      expect(screen.getByText(/Error al cargar los canales/i)).toBeInTheDocument();
    });
  });

  it('abre el modal al hacer clic en el botón "Crear canal"', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({
      data: { data: { channels: [] } },
    });

    render(<ChannelList />);
    fireEvent.click(screen.getByRole('button', { name: /Crear canal/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/título del canal/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/descripción/i)).toBeInTheDocument();
    });
  });
});