import { render, screen } from '@testing-library/react';
import { Heading } from '@/components/ui/Heading';
import '@testing-library/jest-dom';

describe('Heading', () => {
  it('renderiza el título correctamente', () => {
    render(<Heading title="Título de prueba" />);
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
  });

  it('renderiza el subtítulo si se proporciona', () => {
    render(<Heading title="Título" subtitle="Subtítulo" />);
    expect(screen.getByText('Subtítulo')).toBeInTheDocument();
  });

  it('aplica clase de centrado si center es true', () => {
    const { container } = render(<Heading title="Título centrado" center />);
    expect(container.firstChild).toHaveClass('text-center');
  });

  it('no aplica clase de centrado si center es false', () => {
    const { container } = render(<Heading title="Título normal" />);
    expect(container.firstChild).not.toHaveClass('text-center');
  });
});