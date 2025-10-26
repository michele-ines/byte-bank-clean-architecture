const mockShowToast = jest.fn();
jest.mock("@/src/utils/transactions.utils", () => ({
  formatTransactionDescription: jest.fn(),
  showToast: mockShowToast,
}));

const mockResetPassword = jest.fn();
jest.mock("@/src/contexts/AuthContext", () => ({
  useAuth: () => ({
    resetPassword: mockResetPassword,
  }),
}));

const mockReplace = jest.fn();
const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  router: {
    replace: mockReplace,
    push: mockPush,
  },
}));

jest.doMock("expo-router", () => ({
  router: {
    replace: mockReplace,
    push: mockPush,
  },
}));

jest.mock("@/src/routes", () => ({
  routes: {
    login: "/login",
  },
}));

import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

jest.mock("@/src/components/common/DefaultButton/DefaultButton", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return {
    DefaultButton: ({ title, onPress, disabled, loading, accessibilityLabel, accessibilityHint }: any) => (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        testID={title === "Enviar" ? "button-enviar" : "button-voltar"}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        <Text>{loading ? "Loading..." : title}</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock("@/src/theme/texts", () => ({
  texts: {
    forgotPasswordForm: {
      title: "Esqueci minha senha",
      label: "Digite seu e-mail para recuperar a senha:",
      placeholder: "Digite seu e-mail",
      buttons: {
        submit: "Enviar",
        back: "Voltar",
      },
      toasts: {
        emptyEmail: {
          title: "Campo obrigatório",
          message: "Por favor, digite seu e-mail",
        },
        success: {
          title: "E-mail enviado",
          message: "Verifique sua caixa de entrada",
        },
        error: {
          title: "Erro",
          message: "Erro ao enviar e-mail de recuperação",
        },
      },
      accessibility: {
        form: "Formulário de recuperação de senha",
        emailInput: "Campo de e-mail",
        submitButton: "Botão enviar",
        submitHint: "Toque para enviar e-mail de recuperação",
        backButton: "Botão voltar",
      },
    },
  },
}));

jest.mock("./ForgotPasswordForm.styles", () => ({
  styles: {
    card: {},
    title: {},
    label: {},
    input: {},
    submit: {},
    submitText: {},
    backButton: {},
    backText: {},
  },
}));

describe("ForgotPasswordForm", () => {
  const mockOnSubmitSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderização", () => {
    it("renderiza todos os elementos do formulário", () => {
      render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

      expect(screen.getByText("Esqueci minha senha")).toBeTruthy();
      expect(screen.getByText("Digite seu e-mail para recuperar a senha:")).toBeTruthy();
      expect(screen.getByPlaceholderText("Digite seu e-mail")).toBeTruthy();
      expect(screen.getByText("Enviar")).toBeTruthy();
      expect(screen.getByText("Voltar")).toBeTruthy();
    });

    it("renderiza com acessibilidade correta", () => {
      render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

      const form = screen.getByLabelText("Formulário de recuperação de senha");
      const emailInput = screen.getByLabelText("Campo de e-mail");

      expect(form).toBeTruthy();
      expect(emailInput).toBeTruthy();
    });
  });

  describe("Interações do usuário", () => {
    it("permite digitar no campo de e-mail", () => {
      render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

      const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
      fireEvent.changeText(emailInput, "test@example.com");

      expect(emailInput.props.value).toBe("test@example.com");
    });
  });

  describe("Validação de formulário", () => {
    it("não chama resetPassword quando e-mail está vazio", async () => {
      render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

      const submitButton = screen.getByTestId("button-enviar");
      fireEvent.press(submitButton);

      expect(mockResetPassword).not.toHaveBeenCalled();
    });
  });
});
