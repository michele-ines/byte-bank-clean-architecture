import { router } from "expo-router";
import React from "react";

import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { ROUTES } from "@shared/constants/routes";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { LoginForm } from "../Login/LoginForm";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
  Link: "Link",
}));

jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
}));

jest.mock("react-native-svg", () => {
  const SvgMock = "SvgMock";
  return {
    default: SvgMock,
    SvgXml: SvgMock,
  };
});

jest.mock("react-native-gesture-handler", () => ({
  ScrollView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@assets/images/login/ilustracao-login.svg", () => {
  const MockSvgImage = (): null => null;
  MockSvgImage.displayName = "MockSvgImage";
  return MockSvgImage;
});

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((..._args: unknown[]) => undefined);
});

describe("LoginForm", (): void => {
  const mockLogin = jest.fn();
  const mockOnLoginSuccess = jest.fn();

  beforeEach((): void => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      logout: jest.fn(),
      signup: jest.fn(),
      resetPassword: jest.fn(),
      user: null,
    });

    mockLogin.mockClear();
    mockOnLoginSuccess.mockClear();
    (router.push as jest.Mock).mockClear();
    (showToast as jest.Mock).mockClear();
  });

  const renderLoginForm = (): ReturnType<typeof render> =>
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);

  const getElements = (): {
    emailInput: ReturnType<typeof screen.getByPlaceholderText>;
    passwordInput: ReturnType<typeof screen.getByPlaceholderText>;
    submitButton: ReturnType<typeof screen.getByText>;
    createButton: ReturnType<typeof screen.getByText>;
    forgotLink: ReturnType<typeof screen.getByText>;
  } => ({
    emailInput: screen.getByPlaceholderText(texts.loginForm.placeholders.email),
    passwordInput: screen.getByPlaceholderText(texts.loginForm.placeholders.password),
    submitButton: screen.getByText(texts.loginForm.buttons.submit),
    createButton: screen.getByText(texts.loginForm.buttons.create),
    forgotLink: screen.getByText(texts.loginForm.buttons.forgot),
  });

  describe("renderização inicial", (): void => {
    it("deve renderizar email, senha e botão disabled", (): void => {
      renderLoginForm();
      const { emailInput, passwordInput, submitButton } = getElements();

      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(submitButton).toBeDisabled();
    });

    it("deve renderizar o link Esqueci minha senha", (): void => {
      renderLoginForm();
      const { forgotLink } = getElements();
      expect(forgotLink).toBeTruthy();
    });
  });

  describe("handleLogin function", (): void => {
    const validEmail = "test@example.com";
    const strongPassword = "Password123";

    it("desabilita o botão se vazio", (): void => {
      renderLoginForm();
      const { submitButton } = getElements();
      expect(submitButton).toBeDisabled();
    });

    it("habilita o botão quando preenchido corretamente", (): void => {
      renderLoginForm();
      const { emailInput, passwordInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, validEmail);
      fireEvent.changeText(passwordInput, strongPassword);

      expect(submitButton).not.toBeDisabled();
    });

    it("mostra erro inline para email inválido", async () => {
      renderLoginForm();
      const { emailInput, passwordInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, "invalid-email");
      fireEvent.changeText(passwordInput, strongPassword);

      expect(submitButton).toBeDisabled();
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText(texts.formToasts.error.invalidEmail.message)).toBeTruthy();
      });
    });

    it("mostra erro inline para senha fraca", async () => {
      renderLoginForm();
      const { emailInput, passwordInput, submitButton } = getElements();

      fireEvent.changeText(passwordInput, "weak");
      fireEvent.changeText(emailInput, validEmail);

      expect(submitButton).toBeDisabled();
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText(texts.formToasts.error.weakPassword.message)).toBeTruthy();
      });
    });

    it("faz login com sucesso", async () => {
      mockLogin.mockResolvedValue(true);
      renderLoginForm();

      const { emailInput, passwordInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, validEmail);
      fireEvent.changeText(passwordInput, strongPassword);

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: validEmail,
          password: strongPassword,
        });
        expect(mockOnLoginSuccess).toHaveBeenCalledWith(validEmail);
      });
    });

    it("exibe toast em falha de login", async () => {
      mockLogin.mockRejectedValue(new Error("Auth failed"));
      renderLoginForm();

      const { emailInput, passwordInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, validEmail);
      fireEvent.changeText(passwordInput, strongPassword);

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith(
          "error",
          "Erro de Login",
          texts.loginForm.toasts.loginError.message
        );
      });
    });
  });

  describe("handleCreateAccount", (): void => {
    it("navega para a tela de cadastro", (): void => {
      renderLoginForm();
      const { createButton } = getElements();

      fireEvent.press(createButton);
      expect(router.push).toHaveBeenCalledWith(ROUTES.SIGNUP);
    });
  });
});
