// __tests__/components/ui/Sidebar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '@/components/ui/Sidebar';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Sidebar', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    localStorage.clear();
  });

  it('renderiza el título y los enlaces correctamente', () => {
    render(<Sidebar />);
    expect(screen.getByText('Te Lo Cobro')).toBeInTheDocument();
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Subir Archivos')).toBeInTheDocument();
    expect(screen.getByText('Próximamente')).toBeInTheDocument();
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
  });

  it('redirige al home y borra el token al hacer logout', () => {
    localStorage.setItem('authToken', '1234');
    render(<Sidebar />);
    fireEvent.click(screen.getByText('Cerrar sesión'));

    expect(localStorage.getItem('authToken')).toBeNull();
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('muestra el footer con el copyright', () => {
    render(<Sidebar />);
    expect(screen.getByText(/© 2025 Te Lo Cobro/i)).toBeInTheDocument();
  });
});