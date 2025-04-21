import { render, screen } from '@testing-library/react';
import LandingNavbar from '@/components/Home/LandingNavbar';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

// Mock de Link y Router si es necesario
jest.mock('next/link', () => ({ __esModule: true, default: ({ href, children }: any) => <a href={href}>{children}</a> }));
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/')
}));

describe('LandingNavbar', () => {
  it('muestra el nombre de la app', () => {
    render(<LandingNavbar />);
    expect(screen.getByText(/TeLoCobro/i)).toBeInTheDocument();
  });

  it('muestra enlaces de navegación', () => {
    render(<LandingNavbar />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Sobre nosotros')).toBeInTheDocument();
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Regístrate')).toBeInTheDocument();
  });

  it('cada enlace apunta a la ruta correcta', () => {
    render(<LandingNavbar />);
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Sobre nosotros').closest('a')).toHaveAttribute('href', '#about');
    expect(screen.getByText('Iniciar Sesión').closest('a')).toHaveAttribute('href', '/login');
    expect(screen.getByText('Regístrate').closest('a')).toHaveAttribute('href', '/register');
  });
});