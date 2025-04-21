import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/Input';
import '@testing-library/jest-dom';
import { FiMail } from 'react-icons/fi';

describe('Input', () => {
  it('renderiza el input con placeholder', () => {
    render(<Input placeholder="Correo electrónico" />);
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
  });

  it('renderiza el ícono si se proporciona', () => {
    render(<Input placeholder="Correo" icon={<FiMail />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('muestra el mensaje de error si hay error', () => {
    render(<Input placeholder="Campo" error="Campo requerido" />);
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
  });

  it('alternar visibilidad del input de tipo password', () => {
    render(<Input placeholder="Contraseña" type="password" />);
    const input = screen.getByPlaceholderText('Contraseña') as HTMLInputElement;

    // Debería iniciar con type="password"
    expect(input.type).toBe('password');

    // Click para mostrar contraseña
    fireEvent.click(screen.getByRole('button'));
    expect(input.type).toBe('text');

    // Click nuevamente para ocultar contraseña
    fireEvent.click(screen.getByRole('button'));
    expect(input.type).toBe('password');
  });
});