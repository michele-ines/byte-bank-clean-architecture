import { router } from "expo-router";
import React from "react";
import { Text } from "react-native"; // Adicionado para uso no mock do botão

import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { ROUTES } from "@shared/constants/routes";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { SignupForm } from "./SignupForm";

jest.mock("@presentation/components/common/common/DefaultButton/DefaultButton", () => ({
  DefaultButton: ({ onPress, title, ...props }: any) => {
    return (
      <Text 
        onPress={onPress}
        {...props}
      >
        {title}
      </Text>
    );
  },
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
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

jest.mock("@assets/images/cadastro/ilustracao-cadastro.svg", () => {
  const MockSvgImage = () => null;
  MockSvgImage.displayName = "MockSvgImage";
  return MockSvgImage;
});

describe("SignupForm", () => {
  const mockSignup = jest.fn();
  const mockOnSignupSuccess = jest.fn();
  const validName = "Fulano de Tal";
  const validEmail = "newuser@example.com";
  const strongPassword = "Password123";
  const weakPassword = "weak";
  
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signup: mockSignup,
      login: jest.fn(),
      logout: jest.fn(),
      resetPassword: jest.fn(),
      user: null,
    });
    mockSignup.mockClear();
    mockOnSignupSuccess.mockClear();
    (router.push as jest.Mock).mockClear();
    (showToast as jest.Mock).mockClear();
  });

  const renderSignupForm = () => render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);

  const getInputs = () => ({
    nameInput: screen.getByPlaceholderText(texts.signupForm.placeholders.name),
    emailInput: screen.getByPlaceholderText(texts.signupForm.placeholders.email),
    passwordInput: screen.getByPlaceholderText(texts.signupForm.placeholders.password),
    confirmPasswordInput: screen.getByPlaceholderText(texts.signupForm.placeholders.confirmPassword),
    checkbox: screen.getByRole("checkbox"),
    submitButton: screen.getByText(texts.signupForm.buttons.submit),
  });

  describe("Validação de Campos em Tempo Real", () => {
    it("deve exibir erro inline para Nome vazio após interagir", async () => {
      renderSignupForm();
      const { nameInput } = getInputs();
      
      fireEvent.changeText(nameInput, "A");
      fireEvent.changeText(nameInput, "");

      await waitFor(() => {
        expect(screen.getByText(texts.formToasts.error.nameRequired.message)).toBeTruthy();
      });
    });

    it("deve exibir erro inline para Email inválido", async () => {
      renderSignupForm();
      const { emailInput } = getInputs();
      
      fireEvent.changeText(emailInput, "invalido");

      await waitFor(() => {
        expect(screen.getByText(texts.formToasts.error.invalidEmail.message)).toBeTruthy();
      });
    });

    it("deve exibir erro inline para Senha fraca", async () => {
      renderSignupForm();
      const { passwordInput } = getInputs();
      
      fireEvent.changeText(passwordInput, weakPassword);

      await waitFor(() => {
        expect(screen.getByText(texts.formToasts.error.weakPassword.message)).toBeTruthy();
      });
    });

    it("deve exibir erro inline para Confirmação de Senha que não coincide", async () => {
      renderSignupForm();
      const { passwordInput, confirmPasswordInput } = getInputs();
      
      fireEvent.changeText(passwordInput, strongPassword);
      fireEvent.changeText(confirmPasswordInput, "DifferentPass456");

      await waitFor(() => {
        expect(screen.getByText(texts.signupForm.toasts.passwordMismatch.message)).toBeTruthy();
      });
    });
  });
  
  describe("Submissão do Formulário", () => {
    it("deve mostrar toast de erro se termos não forem aceitos", async () => {
      renderSignupForm();
      const { nameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = getInputs();

      // Preenche todos os campos para testar a única falha (checkbox)
      fireEvent.changeText(nameInput, validName);
      fireEvent.changeText(emailInput, validEmail);
      fireEvent.changeText(passwordInput, strongPassword);
      fireEvent.changeText(confirmPasswordInput, strongPassword);
      
      // O mock do botão garante que o onPress será chamado, testando o handler.
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith(
          "error",
          "Atenção", 
          "Você precisa aceitar os termos e condições."
        );
      });
      expect(mockSignup).not.toHaveBeenCalled();
    });

    it("deve realizar o cadastro com sucesso", async () => {
      mockSignup.mockResolvedValue(true);
      renderSignupForm();
      const { nameInput, emailInput, passwordInput, confirmPasswordInput, checkbox, submitButton } = getInputs();
      
      fireEvent.changeText(nameInput, validName);
      fireEvent.changeText(emailInput, validEmail);
      fireEvent.changeText(passwordInput, strongPassword);
      fireEvent.changeText(confirmPasswordInput, strongPassword);
      
      fireEvent.press(checkbox); 

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith({
          email: validEmail,
          password: strongPassword,
          name: validName,
        });
        expect(mockOnSignupSuccess).toHaveBeenCalledWith(validEmail);
        expect(showToast).toHaveBeenCalledWith(
          "success",
          texts.signupForm.toasts.success.title,
          texts.signupForm.toasts.success.message
        );
      });
    });

    it("deve mostrar toast de erro se o email já estiver em uso", async () => {
      const emailInUseError = new Error("auth/email-already-in-use"); 
      (emailInUseError as any).code = "auth/email-already-in-use"; 
      mockSignup.mockRejectedValue(emailInUseError);
      
      renderSignupForm();

      const { nameInput, emailInput, passwordInput, confirmPasswordInput, checkbox, submitButton } = getInputs();
      
      fireEvent.changeText(nameInput, validName);
      fireEvent.changeText(emailInput, validEmail);
      fireEvent.changeText(passwordInput, strongPassword);
      fireEvent.changeText(confirmPasswordInput, strongPassword);
      fireEvent.press(checkbox); 

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith(
          "error",
          "Erro", 
          "Este e-mail já está em uso."
        );
      });
    });
  });

  describe("Navegação", () => {
    it("deve navegar para a tela inicial ao pressionar Voltar para o Login", () => {
      renderSignupForm();
      const backButton = screen.getByText(texts.signupForm.buttons.back);
      fireEvent.press(backButton);
      expect(router.push).toHaveBeenCalledWith(ROUTES.HOME);
    });
  });
});