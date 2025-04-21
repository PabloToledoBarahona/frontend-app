import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';
import '@testing-library/jest-dom';

describe('Card', () => {
  it('renderiza correctamente con contenido hijo', () => {
    render(
      <Card>
        <p>Contenido de prueba</p>
      </Card>
    );

    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  it('aplica clases adicionales correctamente', () => {
    const { container } = render(
      <Card className="bg-red-500">
        <span>Contenido con clase</span>
      </Card>
    );

    expect(container.firstChild).toHaveClass('bg-red-500');
  });
});