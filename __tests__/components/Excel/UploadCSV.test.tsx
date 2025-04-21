import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadCSV from '@/components/Excel/UploadCSV';
import '@testing-library/jest-dom';

// Mock del cliente API
const postMock = jest.fn();
jest.mock('@/lib/apiClient', () => ({
  post: (...args: any[]) => postMock(...args),
}));

describe('UploadCSV', () => {
  beforeEach(() => {
    postMock.mockReset();
  });

  it('renderiza título, input y botón', () => {
    render(<UploadCSV />);
    expect(screen.getByText(/Subir Archivo CSV/i)).toBeInTheDocument();
    expect(screen.getByText(/Seleccionar archivo CSV/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subir Archivo/i })).toBeInTheDocument();
  });

  it('muestra error si el archivo no es CSV', async () => {
    render(<UploadCSV />);
    const file = new File(['contenido'], 'archivo.txt', { type: 'text/plain' });

    const input = screen.getByLabelText(/Seleccionar archivo CSV/i);
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/Solo se permiten archivos CSV/i)).toBeInTheDocument();
    });
  });

  it('muestra error si no se selecciona archivo', async () => {
    render(<UploadCSV />);
    fireEvent.click(screen.getByRole('button', { name: /Subir Archivo/i }));

    await waitFor(() => {
      expect(screen.getByText(/Por favor, selecciona un archivo CSV/i)).toBeInTheDocument();
    });
  });

  it('sube archivo CSV correctamente y muestra contenido', async () => {
    postMock.mockResolvedValueOnce({ data: { content: 'columna1,columna2\nvalor1,valor2' } });

    render(<UploadCSV />);
    const file = new File(['columna1,columna2\nvalor1,valor2'], 'data.csv', { type: 'text/csv' });

    const input = screen.getByLabelText(/Seleccionar archivo CSV/i);
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /Subir Archivo/i }));

    await waitFor(() => {
      expect(screen.getByText(/Archivo subido con éxito/i)).toBeInTheDocument();
      expect(screen.getByText(/Contenido del CSV/i)).toBeInTheDocument();
      expect(screen.getByText(/columna1,columna2/i)).toBeInTheDocument();
    });
  });

  it('muestra mensaje de error si el backend falla', async () => {
    postMock.mockRejectedValueOnce(new Error('Falló'));

    render(<UploadCSV />);
    const file = new File(['contenido'], 'data.csv', { type: 'text/csv' });

    const input = screen.getByLabelText(/Seleccionar archivo CSV/i);
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /Subir Archivo/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error al subir el archivo/i)).toBeInTheDocument();
    });
  });
});