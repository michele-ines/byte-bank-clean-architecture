import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import type React from "react";
import type { JSX, ReactNode } from "react";
import type { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LoginForm } from "./LoginForm";

beforeAll((): void => {
  jest.spyOn(console, "error").mockImplementation((): void => undefined);
});

afterAll((): void => {
  (console.error as jest.Mock).mockRestore();
});

const mockLogin = jest.fn();

jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
  formatTransactionDescription: jest.fn(),
}));

jest.mock("expo-router", () => {
  const ReactLib = require("react") as {
    createElement: <P>(
      type: React.ComponentType<P> | string,
      props: P | null,
      ...children: React.ReactNode[]
    ) => JSX.Element;
  };
  const RN = require("react-native") as {
    TouchableOpacity: typeof TouchableOpacity;
  };
  const TouchableOpacityMock = RN.TouchableOpacity;
  const Link = ({
    children,
    ...props
  }: {
    children: ReactNode;
    [key: string]: unknown;
  }): JSX.Element => ReactLib.createElement(TouchableOpacityMock, props, children);

  (Link as unknown as { displayName: string }).displayName = "MockLink";

  return {
    router: {
      replace: jest.fn(),
      push: jest.fn(),
    },
    Link,
  };
});

jest.mock("@shared/constants/routes", () => ({
  ROUTES: {
    DASHBOARD: "/dashboard",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
  },
}));

jest.mock("react-native-gesture-handler", () => {
  const RN = require("react-native") as {
    ScrollView: typeof ScrollView;
  };
  return { ScrollView: RN.ScrollView };
});
Object.assign(jest.requireMock("react-native-gesture-handler"), {
  displayName: "MockScrollView",
});

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
  }: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    accessibilityLabel?: string;
  }): JSX.Element =>
    ReactLib.createElement(
      TouchableOpacityMock,
      { onPress, disabled: (disabled ?? false) || (loading ?? false), accessibilityLabel },
      ReactLib.createElement(TextMock, null, loading ? "Loading..." : title)
    );

  return { DefaultButton };
});
Object.assign(jest.requireMock("@presentation/components/common/common/DefaultButton/DefaultButton"), {
  displayName: "MockDefaultButton",
});

jest.mock("@assets/images/login/ilustracao-login.svg", () => {
  const ReactLib = require("react") as {
    createElement: <P>(
      type: React.ComponentType<P> | string,
      props: P | null,
      ...children: React.ReactNode[]
    ) => JSX.Element;
  };
  const RN = require("react-native") as {
    View: typeof View;
  };
  const ViewMock = RN.View;
  const SvgMock = ({
    accessible,
    accessibilityLabel,
    ...props
  }: {
    accessible?: boolean;
    accessibilityLabel?: string;
  }): JSX.Element => ReactLib.createElement(ViewMock, { accessible, accessibilityLabel, ...props });

  return { __esModule: true, default: SvgMock };
});
Object.assign(jest.requireMock("@assets/images/login/ilustracao-login.svg"), {
  displayName: "MockSvgImage",
});

describe("LoginForm", () => {
  const mockOnLoginSuccess = jest.fn();

  beforeEach((): void => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
    jest.clearAllMocks();
  });

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
        expect(mockLogin).toHaveBeenCalledWith({ email: "test@example.com", password: "password123" });
      });

  expect(mockOnLoginSuccess).toHaveBeenCalledWith("test@example.com");
  expect(router.replace).not.toHaveBeenCalled();
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
        expect(mockLogin).toHaveBeenCalledWith({ email: "test@example.com", password: "wrongpassword" });
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
        expect(mockLogin).toHaveBeenCalledWith({ email: "test@example.com", password: "password123" });
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
