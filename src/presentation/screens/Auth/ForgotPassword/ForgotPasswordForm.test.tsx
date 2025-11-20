import { router } from "expo-router";
import React from "react";

import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { ROUTES } from "@shared/constants/routes";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
}));

describe("ForgotPasswordForm", () => {
  const mockResetPassword = jest.fn();
  const mockOnSubmitSuccess = jest.fn();
  const validEmail = "test@example.com";

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      resetPassword: mockResetPassword,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      user: null,
    });
    mockResetPassword.mockClear();
    mockOnSubmitSuccess.mockClear();
    (router.push as jest.Mock).mockClear();
    (router.replace as jest.Mock).mockClear();
    (showToast as jest.Mock).mockClear();
  });

  const renderForgotPasswordForm = () => render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

  const getElements = () => ({
    emailInput: screen.getByPlaceholderText(texts.forgotPasswordForm.placeholder),
    submitButton: screen.getByText(texts.forgotPasswordForm.buttons.submit),
    backButton: screen.getByText(texts.forgotPasswordForm.buttons.back),
  });

  describe("Renderização e Estado Inicial", () => {
    it("deve renderizar o campo de email e o botão de envio desabilitado", () => {
      renderForgotPasswordForm();
      const { emailInput, submitButton } = getElements();
      expect(emailInput).toBeTruthy();
      expect(submitButton).toBeDisabled();
    });
  });

  describe("Validação e Submissão", () => {
    it("deve habilitar o botão para um email válido", () => {
      renderForgotPasswordForm();
      const { emailInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, validEmail);
      expect(submitButton).not.toBeDisabled();
    });

    it("deve exibir erro inline e desabilitar o botão para email inválido", async () => {
      renderForgotPasswordForm();
      const { emailInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, "email-invalido");
      expect(submitButton).toBeDisabled();
      
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText(texts.formToasts.error.invalidEmail.message)).toBeTruthy();
      });
    });

    it("deve chamar resetPassword, mostrar toast de sucesso e navegar para o login em caso de sucesso", async () => {
      mockResetPassword.mockResolvedValue(true);
      renderForgotPasswordForm();
      const { emailInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, validEmail);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith(validEmail);
        expect(showToast).toHaveBeenCalledWith(
          "success",
          texts.forgotPasswordForm.toasts.success.title,
          texts.forgotPasswordForm.toasts.success.message
        );
        expect(mockOnSubmitSuccess).toHaveBeenCalledWith(validEmail);
        expect(router.replace).toHaveBeenCalledWith(ROUTES.LOGIN);
      });
    });

    it("deve mostrar toast de erro em caso de falha no reset de senha", async () => {
      const resetError = new Error("Reset failed");
      mockResetPassword.mockRejectedValue(resetError);
      renderForgotPasswordForm();
      const { emailInput, submitButton } = getElements();

      fireEvent.changeText(emailInput, validEmail);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith(
          "error",
          texts.forgotPasswordForm.toasts.error.title,
          resetError.message
        );
        expect(router.replace).not.toHaveBeenCalled();
      });
    });
  });

  describe("Navegação", () => {
    it("deve navegar para a tela de login ao pressionar o botão Voltar", () => {
      renderForgotPasswordForm();
      const { backButton } = getElements();
      fireEvent.press(backButton);
      expect(router.push).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });
});