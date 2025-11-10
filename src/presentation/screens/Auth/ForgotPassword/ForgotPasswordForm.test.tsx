import { fireEvent, render, screen } from "@testing-library/react-native";
import type React from "react";
import type { JSX } from "react";
import type { Text, TouchableOpacity } from "react-native";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const mockShowToast = jest.fn();
jest.mock("@shared/utils/transactions.utils", () => ({
  formatTransactionDescription: jest.fn(),
  showToast: mockShowToast,
}));

const mockResetPassword = jest.fn();
jest.mock("@presentation/state/AuthContext", () => ({
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

jest.mock("@shared/constants/routes", () => ({
  ROUTES: {
    LOGIN: "/login",
  },
}));

jest.mock("@presentation/components/common/common/DefaultButton/DefaultButton", () => {
  const ReactLib = require("react") as {
    createElement: <P>(
      type: React.ComponentType<P> | string,
      props: P | null,
      ...children: React.ReactNode[]
    ) => JSX.Element;
  };
  const RN = require("react-native") as {
    TouchableOpacity: typeof TouchableOpacity;
    Text: typeof Text;
  };
  const TouchableOpacityMock = RN.TouchableOpacity;
  const TextMock = RN.Text;
  const DefaultButton = ({
    title,
    onPress,
    disabled,
    loading,
    accessibilityLabel,
    accessibilityHint,
  }: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
  }): JSX.Element =>
    ReactLib.createElement(
      TouchableOpacityMock,
      {
        onPress,
        disabled: (disabled ?? false) || (loading ?? false),
        testID: title === "Enviar" ? "button-enviar" : "button-voltar",
        accessibilityLabel,
        accessibilityHint,
      },
      ReactLib.createElement(TextMock, null, loading ? "Loading..." : title)
    );

  return { DefaultButton };
});

jest.mock("@presentation/theme", () => ({
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

  beforeEach((): void => {
    jest.clearAllMocks();
  });

  describe("Renderização", () => {
    it("renderiza todos os elementos do formulário", (): void => {
      render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

      expect(screen.getByText("Esqueci minha senha")).toBeTruthy();
      expect(
        screen.getByText("Digite seu e-mail para recuperar a senha:")
      ).toBeTruthy();
      expect(screen.getByPlaceholderText("Digite seu e-mail")).toBeTruthy();
      expect(screen.getByText("Enviar")).toBeTruthy();
      expect(screen.getByText("Voltar")).toBeTruthy();
    });

    it("renderiza com acessibilidade correta", (): void => {
      render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

      const form = screen.getByLabelText("Formulário de recuperação de senha");
      const emailInput = screen.getByLabelText("Campo de e-mail");

      expect(form).toBeTruthy();
      expect(emailInput).toBeTruthy();
    });
  });

  describe("Interações do usuário", () => {
    it("permite digitar no campo de e-mail", (): void => {
      render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

      const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
      fireEvent.changeText(emailInput, "test@example.com");

      expect(emailInput.props.value).toBe("test@example.com");
    });
  });

  describe("Validação de formulário", () => {
    it("não chama resetPassword quando e-mail está vazio", (): void => {
      render(<ForgotPasswordForm onSubmitSuccess={mockOnSubmitSuccess} />);

      const submitButton = screen.getByTestId("button-enviar");
      fireEvent.press(submitButton);

      expect(mockResetPassword).not.toHaveBeenCalled();
    });
  });
});
