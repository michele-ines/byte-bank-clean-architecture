import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import type { JSX } from "react";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LoginForm } from "./LoginForm";

// ✅ Evita arrow function vazia — adiciona comentário interno
beforeAll((): void => {
  jest.spyOn(console, "error").mockImplementation(() => {
    /* silence console.error */
  });
});
afterAll((): void => {
  (console.error as jest.Mock).mockRestore();
});

const mockLogin = jest.fn();

// ✅ Corrige path e tipagem do mock
jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
  formatTransactionDescription: jest.fn(),
}));

// ✅ Tipagem explícita e nullish coalescing (`??`)
jest.mock("expo-router", () => {
  const Link = ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }): JSX.Element => <TouchableOpacity {...props}>{children}</TouchableOpacity>;

  (Link as unknown as { displayName: string }).displayName = "MockLink";

  return {
    router: {
      replace: jest.fn(),
      push: jest.fn(),
    },
    Link,
  };
});

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
(Object.assign(
  jest.requireMock("react-native-gesture-handler"),
  { displayName: "MockScrollView" }
));

// ✅ Tipagem segura e uso de ?? no disabled
jest.mock("@/src/components/common/DefaultButton/DefaultButton", () => ({
  DefaultButton: ({
    title,
    onPress,
    disabled,
    loading,
    accessibilityLabel,
  }: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    accessibilityLabel?: string;
  }): JSX.Element => (
    <TouchableOpacity
      onPress={onPress}
      disabled={(disabled ?? false) || (loading ?? false)}
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

jest.mock("@/assets/images/login/ilustracao-login.svg", () => ({
  __esModule: true,
  default: ({
    accessible,
    accessibilityLabel,
    ...props
  }: {
    accessible?: boolean;
    accessibilityLabel?: string;
  }): JSX.Element => (
    <View
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      {...props}
    />
  ),
}));
(Object.assign(
  jest.requireMock("@/assets/images/login/ilustracao-login.svg"),
  { displayName: "MockSvgImage" }
));

describe("LoginForm", () => {
  const mockOnLoginSuccess = jest.fn();

  beforeEach((): void => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
    jest.clearAllMocks();
  });

  // ==============================================================
  // handleLogin function
  // ==============================================================
  describe("handleLogin function", () => {
    it("deve fazer login com sucesso quando campos estão preenchidos", async (): Promise<void> => {
      mockLogin.mockResolvedValueOnce(undefined);
      const { getByLabelText } = render(
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      );
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

    it("deve mostrar toast de erro quando login falha", async (): Promise<void> => {
      mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));
      const { getByLabelText } = render(
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      );
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

    it("deve mostrar toast de erro inesperado quando login falha com erro desconhecido", async (): Promise<void> => {
      // ✅ Tipagem segura do erro genérico
      const unknownError: unknown = "Unknown error";
      mockLogin.mockRejectedValueOnce(unknownError);

      const { getByLabelText } = render(
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      );
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

  // ==============================================================
  // handleCreateAccount
  // ==============================================================
  describe("handleCreateAccount function", () => {
    it("deve navegar para página de cadastro quando botão criar conta é pressionado", (): void => {
      const { getByLabelText } = render(
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      );
      const t = texts.loginForm;

      const createAccountButton = getByLabelText(t.accessibility.createButton);
      fireEvent.press(createAccountButton);

      expect(router.push).toHaveBeenCalledWith("/signup");
    });

    it("deve navegar para página de cadastro independente do estado dos campos", (): void => {
      const { getByLabelText } = render(
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      );
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

  // ==============================================================
  // Renderização e comportamento geral
  // ==============================================================
  describe("Renderização e comportamento geral", () => {
    it("renderiza todos os elementos do formulário", (): void => {
      const { getByText, getByLabelText } = render(
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      );
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

    it("deve permitir digitar nos campos de entrada", (): void => {
      const { getByLabelText } = render(
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      );
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
