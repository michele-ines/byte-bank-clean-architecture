import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LoginForm } from "./LoginForm";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

const mockLogin = jest.fn();
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
  Link: (props: any) => (
    <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
  ),
}));
(Object.assign(jest.requireMock("expo-router").Link, { displayName: "MockLink" }));

jest.mock("@/src/routes", () => ({
  routes: {
    dashboard: "/dashboard",
    signup: "/signup",
    forgotPassword: "/forgot-password",
  },
}));

jest.mock("react-native-gesture-handler", () => ({
  ScrollView,
}));
(Object.assign(jest.requireMock("react-native-gesture-handler"), { displayName: "MockScrollView" }));

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
(Object.assign(jest.requireMock("@/src/components/common/DefaultButton/DefaultButton"), { displayName: "MockDefaultButton" }));

jest.mock("@/assets/images/login/ilustracao-login.svg", () => ({
  __esModule: true,
  default: ({ accessible, accessibilityLabel, ...props }: any) => (
    <View accessible={accessible} accessibilityLabel={accessibilityLabel} {...props} />
  ),
}));
(Object.assign(jest.requireMock("@/assets/images/login/ilustracao-login.svg"), { displayName: "MockSvgImage" }));

describe("LoginForm", () => {
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
    jest.clearAllMocks();
  });

  describe("handleLogin function", () => {
    it("deve fazer login com sucesso quando campos estão preenchidos", async () => {
      mockLogin.mockResolvedValueOnce(undefined);
      const { getByLabelText } = render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
      const t = texts.loginForm;

      const emailInput = getByLabelText(t.accessibility.emailInput);
      const passwordInput = getByLabelText(t.accessibility.passwordInput);

      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "password123");

      const loginButton = getByLabelText(t.accessibility.submitButton);
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
      });

      expect(mockOnLoginSuccess).toHaveBeenCalledWith("test@example.com");
      expect(router.replace).toHaveBeenCalledWith("/dashboard");
      expect(showToast).not.toHaveBeenCalled();
    });

    it("deve mostrar toast de erro quando login falha", async () => {
      mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));
      const { getByLabelText } = render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
      const t = texts.loginForm;

      const emailInput = getByLabelText(t.accessibility.emailInput);
      const passwordInput = getByLabelText(t.accessibility.passwordInput);

      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "wrongpassword");

      const loginButton = getByLabelText(t.accessibility.submitButton);
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("test@example.com", "wrongpassword");
      });

      expect(showToast).toHaveBeenCalledWith(
        "error",
        "Erro de Login",
        t.toasts.loginError.message
      );
      expect(mockOnLoginSuccess).not.toHaveBeenCalled();
      expect(router.replace).not.toHaveBeenCalled();
    });

    it("deve mostrar toast de erro inesperado quando login falha com erro desconhecido", async () => {
      mockLogin.mockRejectedValueOnce("Unknown error");
      const { getByLabelText } = render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
      const t = texts.loginForm;

      const emailInput = getByLabelText(t.accessibility.emailInput);
      const passwordInput = getByLabelText(t.accessibility.passwordInput);

      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "password123");

      const loginButton = getByLabelText(t.accessibility.submitButton);
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
      });

      expect(showToast).toHaveBeenCalledWith(
        "error",
        "Erro de Login",
        t.toasts.unexpectedError.message
      );
      expect(mockOnLoginSuccess).not.toHaveBeenCalled();
      expect(router.replace).not.toHaveBeenCalled();
    });
  });

  describe("handleCreateAccount function", () => {
    it("deve navegar para página de cadastro quando botão criar conta é pressionado", () => {
      const { getByLabelText } = render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
      const t = texts.loginForm;

      const createAccountButton = getByLabelText(t.accessibility.createButton);
      fireEvent.press(createAccountButton);

      expect(router.push).toHaveBeenCalledWith("/signup");
    });

    it("deve navegar para página de cadastro independente do estado dos campos", () => {
      const { getByLabelText } = render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
      const t = texts.loginForm;

      const emailInput = getByLabelText(t.accessibility.emailInput);
      const passwordInput = getByLabelText(t.accessibility.passwordInput);

      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "password123");

      const createAccountButton = getByLabelText(t.accessibility.createButton);
      fireEvent.press(createAccountButton);

      expect(router.push).toHaveBeenCalledWith("/signup");
    });
  });

  describe("Renderização e comportamento geral", () => {
    it("renderiza todos os elementos do formulário", () => {
      const { getByText, getByLabelText } = render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
      const t = texts.loginForm;

      expect(getByText(t.title)).toBeTruthy();
      expect(getByText(t.labels.email)).toBeTruthy();
      expect(getByText(t.labels.password)).toBeTruthy();
      expect(getByLabelText(t.accessibility.emailInput)).toBeTruthy();
      expect(getByLabelText(t.accessibility.passwordInput)).toBeTruthy();
      expect(getByLabelText(t.accessibility.submitButton)).toBeTruthy();
      expect(getByLabelText(t.accessibility.createButton)).toBeTruthy();
      expect(getByText(t.buttons.forgot)).toBeTruthy();
    });

    it("deve permitir digitar nos campos de entrada", () => {
      const { getByLabelText } = render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
      const t = texts.loginForm;

      const emailInput = getByLabelText(t.accessibility.emailInput);
      const passwordInput = getByLabelText(t.accessibility.passwordInput);

      fireEvent.changeText(emailInput, "user@test.com");
      fireEvent.changeText(passwordInput, "mypassword");

      expect(emailInput.props.value).toBe("user@test.com");
      expect(passwordInput.props.value).toBe("mypassword");
    });
  });
});
