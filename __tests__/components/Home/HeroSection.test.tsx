import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/Home/HeroSection';
import '@testing-library/jest-dom';

// Mock de next/image para evitar errores durante los tests
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      const { src, alt, ...rest } = props;
      return <img src={typeof src === 'string' ? src : src.src} alt={alt} {...rest} />;
    }
  }));

describe('HeroSection', () => {
  it('renderiza el título principal', () => {
    render(<HeroSection />);
    expect(screen.getByText(/cobra fácil/i)).toBeInTheDocument();
  });

  it('renderiza el párrafo descriptivo', () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Olvídate del seguimiento manual/i)
    ).toBeInTheDocument();
  });

  it('muestra el botón "Más Información"', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /más información/i })).toBeInTheDocument();
  });

  it('muestra la imagen de ilustración', () => {
    render(<HeroSection />);
    expect(screen.getByAltText(/illustration/i)).toBeInTheDocument();
  });

  it('incluye un SVG de curva inferior', () => {
    render(<HeroSection />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector('path')).toHaveAttribute('fill', 'url(#gradient)');
  });
});