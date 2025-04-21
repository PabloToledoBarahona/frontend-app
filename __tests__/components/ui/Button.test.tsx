import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import '@testing-library/jest-dom';

describe('Button component', () => {
  it('renderiza el label correctamente', () => {
    render(<Button label="Hacer clic" />);
    expect(screen.getByText('Hacer clic')).toBeInTheDocument();
  });

  it('llama a la función onClick al hacer clic', () => {
    const handleClick = jest.fn();
    render(<Button label="Clic" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Clic'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('usa la clase para el estilo primario por defecto', () => {
    render(<Button label="Primario" />);
    const button = screen.getByText('Primario');
    expect(button).toHaveClass('from-blue-500');
    expect(button).toHaveClass('to-purple-500');
  });

  it('usa la clase para el estilo secundario cuando se especifica', () => {
    render(<Button label="Secundario" variant="secondary" />);
    const button = screen.getByText('Secundario');
    expect(button).toHaveClass('bg-gray-100');
    expect(button).toHaveClass('text-gray-800');
  });
});