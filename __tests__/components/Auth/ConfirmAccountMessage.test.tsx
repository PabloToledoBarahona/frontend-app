import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import ConfirmAccountMessage from "@/components/Auth/ConfirmAccountMessage";
import "@testing-library/jest-dom";
import apiClient from "@/lib/apiClient";
import { useSearchParams, useRouter } from "next/navigation";

jest.mock("@/lib/apiClient", () => ({
  post: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

const mockedUseSearchParams = useSearchParams as jest.Mock;
const mockedUseRouter = useRouter as jest.Mock;
const mockedPost = apiClient.post as jest.Mock;

describe("ConfirmAccountMessage", () => {
  beforeEach(() => {
    mockedPost.mockReset();
    cleanup();
  });

  it("renderiza título y campos", () => {
    mockedUseSearchParams.mockReturnValue({
      get: (key: string) => {
        if (key === "email") return "pablo@test.com";
        if (key === "user_id") return "123";
        return null;
      },
    });
    mockedUseRouter.mockReturnValue({ push: jest.fn() });

    render(<ConfirmAccountMessage />);

    expect(screen.getByText(/Confirma tu cuenta/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Código de verificación/i)).toBeInTheDocument();
  });

  it("muestra errores si se envía vacío o inválido", async () => {
    mockedUseSearchParams.mockReturnValue({
      get: () => null,
    });
    mockedUseRouter.mockReturnValue({ push: jest.fn() });

    render(<ConfirmAccountMessage />);
    fireEvent.click(screen.getAllByRole("button", { name: /Confirmar Cuenta/i })[0]);

    await waitFor(() => {
      expect(screen.getByText(/Correo inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/Código inválido/i)).toBeInTheDocument();
    });
  });

  it("muestra error si falta user_id", async () => {
    mockedUseSearchParams.mockReturnValue({
      get: (key: string) => (key === "email" ? "pablo@test.com" : null),
    });
    mockedUseRouter.mockReturnValue({ push: jest.fn() });

    render(<ConfirmAccountMessage />);
    fireEvent.change(screen.getByPlaceholderText(/Código de verificación/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getAllByRole("button", { name: /Confirmar Cuenta/i })[0]);

    await waitFor(() => {
      expect(screen.getByText(/Faltan parámetros para confirmar la cuenta/i)).toBeInTheDocument();
    });
  });

  it("muestra error si backend responde con error", async () => {
    mockedUseSearchParams.mockReturnValue({
      get: (key: string) => {
        if (key === "email") return "pablo@test.com";
        if (key === "user_id") return "mock-id";
        return null;
      },
    });
    mockedUseRouter.mockReturnValue({ push: jest.fn() });

    mockedPost.mockRejectedValueOnce({
      response: {
        data: {
          data: {
            error: [{ message: "Código incorrecto" }],
          },
        },
      },
    });

    render(<ConfirmAccountMessage />);

    fireEvent.change(screen.getByPlaceholderText(/Código de verificación/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getAllByRole("button", { name: /Confirmar Cuenta/i })[0]);

    await waitFor(() => {
      expect(screen.getByText(/Código incorrecto/i)).toBeInTheDocument();
    });
  });

  it("muestra éxito y redirige a login", async () => {
    jest.useFakeTimers();
    const pushMock = jest.fn();

    mockedUseSearchParams.mockReturnValue({
      get: (key: string) => {
        if (key === "email") return "pablo@test.com";
        if (key === "user_id") return "mock-id";
        return null;
      },
    });
    mockedUseRouter.mockReturnValue({ push: pushMock });

    mockedPost.mockResolvedValueOnce({
      data: { message: "Cuenta confirmada" },
    });

    render(<ConfirmAccountMessage />);
    fireEvent.change(screen.getByPlaceholderText(/Código de verificación/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getAllByRole("button", { name: /Confirmar Cuenta/i })[0]);

    await waitFor(() => {
      expect(screen.getByText(/Cuenta confirmada/i)).toBeInTheDocument();
    });

    jest.advanceTimersByTime(1500);
    expect(pushMock).toHaveBeenCalledWith("/login");
    jest.useRealTimers();
  });
});