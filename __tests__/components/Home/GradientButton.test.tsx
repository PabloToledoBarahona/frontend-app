import { render, screen, fireEvent } from '@testing-library/react';
import GradientButton from '@/components/Home/GradientButton';
import '@testing-library/jest-dom';

describe('GradientButton', () => {
  it('renderiza correctamente el texto', () => {
    render(<GradientButton label="Ir al inicio" />);
    expect(screen.getByRole('button', { name: /Ir al inicio/i })).toBeInTheDocument();
  });

  it('ejecuta onClick cuando se hace clic', () => {
    const onClickMock = jest.fn();
    render(<GradientButton label="Haz clic" onClick={onClickMock} />);

    fireEvent.click(screen.getByRole('button', { name: /Haz clic/i }));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('no lanza error si no se pasa onClick', () => {
    render(<GradientButton label="Solo renderizar" />);
    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: /Solo renderizar/i }));
    }).not.toThrow();
  });
});