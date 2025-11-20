import { router } from "expo-router";
import React from "react";

import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { ROUTES } from "@shared/constants/routes";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { LoginForm } from "./LoginForm";

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

jest.mock("@assets/images/login/ilustracao-login.svg", () => {
  const MockSvgImage = () => null;
  MockSvgImage.displayName = "MockSvgImage";
  return MockSvgImage;
});

describe("LoginForm", () => {
  const mockLogin = jest.fn();
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
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

  const renderLoginForm = () => render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
  
  const getElements = () => ({
    emailInput: screen.getByPlaceholderText(texts.loginForm.placeholders.email),
    passwordInput: screen.getByPlaceholderText(texts.loginForm.placeholders.password),
    submitButton: screen.getByText(texts.loginForm.buttons.submit),
    createButton: screen.getByText(texts.loginForm.buttons.create),
    forgotLink: screen.getByText(texts.loginForm.buttons.forgot),
  });

  describe("renderização inicial", () => {
    it("deve renderizar os campos de email e senha", () => {
      renderLoginForm();
      const { emailInput, passwordInput, submitButton } = getElements();
      
      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(submitButton).toBeDisabled();
    });

    it("deve renderizar o link Esqueci minha senha", () => {
      renderLoginForm();
      const { forgotLink } = getElements();
      expect(forgotLink).toBeTruthy();
    });
  });

  describe("handleLogin function", () => {
    const validEmail = "test@example.com";
    const strongPassword = "Password123";

    it("deve desabilitar o botão se os campos estiverem vazios", () => {
      renderLoginForm();
      const { submitButton } = getElements();
      expect(submitButton).toBeDisabled();
    });

    it("deve habilitar o botão quando os campos são preenchidos com valores válidos", () => {
      renderLoginForm();
      const { emailInput, passwordInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, validEmail);
      fireEvent.changeText(passwordInput, strongPassword);

      expect(submitButton).not.toBeDisabled();
    });

    it("deve exibir erro inline para email inválido", async () => {
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

    it("deve exibir erro inline para senha fraca", async () => {
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


    it("deve fazer login com sucesso quando campos estão preenchidos corretamente", async () => {
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
        expect(submitButton).not.toBeDisabled();
      });
    });

    it("deve mostrar toast de erro em caso de falha de login", async () => {
      const loginError = new Error("Auth failed");
      mockLogin.mockRejectedValue(loginError);
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

  describe("handleCreateAccount", () => {
    it("deve navegar para a tela de cadastro ao pressionar o botão Criar Conta", () => {
      renderLoginForm();
      const { createButton } = getElements();
      fireEvent.press(createButton);
      expect(router.push).toHaveBeenCalledWith(ROUTES.SIGNUP);
    });
  });
});