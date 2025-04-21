import { render } from '@testing-library/react';
import { Spinner } from '@/components/ui/Spinner';
import '@testing-library/jest-dom';

describe('Spinner', () => {
  it('renderiza el spinner con clases esperadas', () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector('div > div:nth-child(1) > div');

    expect(spinnerDiv).toBeInTheDocument();
    expect(spinnerDiv).toHaveClass(
      'w-16',
      'h-16',
      'border-t-4',
      'border-blue-500',
      'border-solid',
      'rounded-full',
      'animate-spin'
    );
  });
});