import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SignupForm } from "./SignupForm";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

const mockSignup = jest.fn();

jest.mock("@/src/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/src/utils/transactions.utils", () => ({
  showToast: jest.fn(),
  formatTransactionDescription: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

jest.mock("@/src/routes", () => ({
  routes: {
    dashboard: "/dashboard",
    home: "/home",
  },
}));

jest.mock("@/src/components/common/DefaultButton/DefaultButton", () => ({
  DefaultButton: ({ title, onPress, disabled, loading, accessibilityLabel }: any) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel}
    >
      <Text>{loading ? "Loading..." : title}</Text>
    </TouchableOpacity>
  ),
}));
(Object.assign(
  jest.requireMock("@/src/components/common/DefaultButton/DefaultButton"),
  { displayName: "MockDefaultButton" }
));

jest.mock("@/src/shared/components/Checkbox/Checkbox", () => ({
  Checkbox: ({ value, onValueChange, accessibilityLabel }: any) => (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="checkbox"
    >
      <Text>{value ? "☑" : "☐"}</Text>
    </TouchableOpacity>
  ),
}));
(Object.assign(
  jest.requireMock("@/src/shared/components/Checkbox/Checkbox"),
  { displayName: "MockCheckbox" }
));

jest.mock("@/assets/images/cadastro/ilustracao-cadastro.svg", () => ({
  __esModule: true,
  default: ({ accessible, accessibilityLabel, ...props }: any) => (
    <View accessible={accessible} accessibilityLabel={accessibilityLabel} {...props} />
  ),
}));
(Object.assign(
  jest.requireMock("@/assets/images/cadastro/ilustracao-cadastro.svg"),
  { displayName: "MockSignupIllustration" }
));

describe("SignupForm", () => {
  const mockOnSignupSuccess = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signup: mockSignup,
    });
    jest.clearAllMocks();
  });

  describe("handleSubmit function", () => {
    it("deve mostrar toast de erro quando senha é muito fraca", async () => {
      const { getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;
      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "123");
      fireEvent.changeText(getByLabelText(t.fields.confirmPassword), "123");
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      expect(showToast).toHaveBeenCalledWith(
        "error",
        t.toasts.passwordWeak.title,
        t.toasts.passwordWeak.message
      );
      expect(mockSignup).not.toHaveBeenCalled();
    });

    it("deve mostrar toast de erro quando senhas não coincidem", async () => {
      const { getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(getByLabelText(t.fields.confirmPassword), "password456");
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      expect(showToast).toHaveBeenCalledWith(
        "error",
        t.toasts.passwordMismatch.title,
        t.toasts.passwordMismatch.message
      );
      expect(mockSignup).not.toHaveBeenCalled();
    });

    it("deve fazer signup com sucesso quando todos os campos estão válidos", async () => {
      mockSignup.mockResolvedValueOnce(undefined);
      const { getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(getByLabelText(t.fields.confirmPassword), "password123");
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith("joao@test.com", "password123", "João Silva");
      });

      expect(mockOnSignupSuccess).toHaveBeenCalledWith("joao@test.com");
      expect(showToast).toHaveBeenCalledWith(
        "success",
        t.toasts.success.title,
        t.toasts.success.message
      );
      expect(router.replace).toHaveBeenCalledWith("/dashboard");
    });

    it("deve mostrar toast de erro quando email já está em uso", async () => {
      const emailInUseError = new Error("Email already in use");
      (emailInUseError as any).code = "auth/email-already-in-use";
      mockSignup.mockRejectedValueOnce(emailInUseError);

      const { getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(getByLabelText(t.fields.confirmPassword), "password123");
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith("joao@test.com", "password123", "João Silva");
      });

      expect(showToast).toHaveBeenCalledWith(
        "error",
        t.toasts.emailInUse.title,
        t.toasts.emailInUse.message
      );
      expect(mockOnSignupSuccess).not.toHaveBeenCalled();
      expect(router.replace).not.toHaveBeenCalled();
    });

    it("deve mostrar toast de erro genérico quando signup falha com erro desconhecido", async () => {
      mockSignup.mockRejectedValueOnce(new Error("Unknown error"));

      const { getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(getByLabelText(t.fields.confirmPassword), "password123");
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith("joao@test.com", "password123", "João Silva");
      });

      expect(showToast).toHaveBeenCalledWith(
        "error",
        t.toasts.genericError.title,
        t.toasts.genericError.message
      );
      expect(mockOnSignupSuccess).not.toHaveBeenCalled();
      expect(router.replace).not.toHaveBeenCalled();
    });
  });

  describe("validateEmail function", () => {
    it("deve mostrar erro quando email é inválido", () => {
      const { getByLabelText, getByText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      const emailInput = getByLabelText(t.fields.email);
      fireEvent.changeText(emailInput, "email-invalido");

      expect(getByText("Dado incorreto. Revise e digite novamente.")).toBeTruthy();
    });

    it("não deve mostrar erro quando email é válido", () => {
      const { getByLabelText, queryByText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      const emailInput = getByLabelText(t.fields.email);
      fireEvent.changeText(emailInput, "joao@test.com");

      expect(queryByText("Dado incorreto. Revise e digite novamente.")).toBeNull();
    });

    it("deve mostrar toast de erro no submit quando email tem erro de validação", () => {
      const { getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "email-invalido");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(getByLabelText(t.fields.confirmPassword), "password123");
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      expect(showToast).toHaveBeenCalledWith(
        "error",
        t.toasts.emailInvalid.title,
        t.toasts.emailInvalid.message
      );
      expect(mockSignup).not.toHaveBeenCalled();
    });
  });

  describe("Renderização e comportamento geral", () => {
    it("renderiza todos os elementos do formulário", () => {
      const { getByText, getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      expect(getByText(t.title)).toBeTruthy();
      expect(getByText(t.fields.name)).toBeTruthy();
      expect(getByText(t.fields.email)).toBeTruthy();
      expect(getByText(t.fields.password)).toBeTruthy();
      expect(getByText(t.fields.confirmPassword)).toBeTruthy();
      expect(getByLabelText(t.accessibility.checkbox)).toBeTruthy();
      expect(getByLabelText(t.buttons.submit)).toBeTruthy();
      expect(getByLabelText(t.buttons.back)).toBeTruthy();
    });

    it("deve navegar para home quando botão voltar é pressionado", () => {
      const { getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      const backButton = getByLabelText(t.buttons.back);
      fireEvent.press(backButton);

      expect(router.push).toHaveBeenCalledWith("/home");
    });

    it("deve permitir digitar nos campos de entrada", () => {
      const { getByLabelText } = render(<SignupForm onSignupSuccess={mockOnSignupSuccess} />);
      const t = texts.signupForm;

      const nameInput = getByLabelText(t.fields.name);
      const emailInput = getByLabelText(t.fields.email);
      const passwordInput = getByLabelText(t.fields.password);
      const confirmPasswordInput = getByLabelText(t.fields.confirmPassword);

      fireEvent.changeText(nameInput, "João Silva");
      fireEvent.changeText(emailInput, "joao@test.com");
      fireEvent.changeText(passwordInput, "password123");
      fireEvent.changeText(confirmPasswordInput, "password123");

      expect(nameInput.props.value).toBe("João Silva");
      expect(emailInput.props.value).toBe("joao@test.com");
      expect(passwordInput.props.value).toBe("password123");
      expect(confirmPasswordInput.props.value).toBe("password123");
    });
  });
});
