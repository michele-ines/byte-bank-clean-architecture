/* eslint-disable @typescript-eslint/require-await */
import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { showToast } from "@shared/utils/transactions.utils";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import type { JSX } from "react";
import { SignupForm } from "./SignupForm";

// ✅ Evita função vazia
beforeAll((): void => {
  jest.spyOn(console, "error").mockImplementation(() => {
    /* silence console.error */
  });
});
afterAll((): void => {
  (console.error as jest.Mock).mockRestore();
});

const mockSignup = jest.fn();

// ✅ Corrige mocks
jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
  formatTransactionDescription: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

jest.mock("@shared/constants/routes", () => ({
  ROUTES: {
    DASHBOARD: "/dashboard",
    HOME: "/home",
  },
}));

// ✅ Mock de DefaultButton
jest.mock("@presentation/components/common/common/DefaultButton/DefaultButton", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ TouchableOpacity: unknown; Text: unknown; View: unknown }>("react-native");
  const mockTouchableOpacity = reactNative.TouchableOpacity;
  const mockText = reactNative.Text;
  return {
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
    }): JSX.Element => {
      return mockReact.createElement(
        mockTouchableOpacity,
        { onPress, disabled: (disabled ?? false) || (loading ?? false), accessibilityLabel },
        mockReact.createElement(mockText, null, loading ? "Loading..." : title)
      );
    },
  };
});
Object.assign(
  jest.requireMock("@presentation/components/common/common/DefaultButton/DefaultButton"),
  { displayName: "MockDefaultButton" }
);

// ✅ Mock de Checkbox
jest.mock("@shared/components/Checkbox/Checkbox", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ TouchableOpacity: unknown; Text: unknown; View: unknown }>("react-native");
  const mockTouchableOpacity = reactNative.TouchableOpacity;
  const mockText = reactNative.Text;
  return {
    Checkbox: ({
      value,
      onValueChange,
      accessibilityLabel,
    }: {
      value: boolean;
      onValueChange: (newVal: boolean) => void;
      accessibilityLabel?: string;
    }): JSX.Element => {
      return mockReact.createElement(
        mockTouchableOpacity,
        { onPress: () => onValueChange(!value), accessibilityLabel, accessibilityRole: "checkbox" },
        mockReact.createElement(mockText, null, value ? "☑" : "☐")
      );
    },
  };
});
Object.assign(jest.requireMock("@shared/components/Checkbox/Checkbox"), {
  displayName: "MockCheckbox",
});

// ✅ Mock de SVG
jest.mock("@assets/images/cadastro/ilustracao-cadastro.svg", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ TouchableOpacity: unknown; Text: unknown; View: unknown }>("react-native");
  const mockView = reactNative.View;
  return {
    __esModule: true,
    default: ({
      accessible,
      accessibilityLabel,
      ...props
    }: {
      accessible?: boolean;
      accessibilityLabel?: string;
    }): JSX.Element => {
      return mockReact.createElement(mockView, { accessible, accessibilityLabel, ...props });
    },
  };
});
Object.assign(
  jest.requireMock("@assets/images/cadastro/ilustracao-cadastro.svg"),
  { displayName: "MockSignupIllustration" }
);

describe("SignupForm", () => {
  const mockOnSignupSuccess = jest.fn();

  beforeEach((): void => {
    (useAuth as jest.Mock).mockReturnValue({
      signup: mockSignup,
    });
    jest.clearAllMocks();
  });

  // ==============================================================
  // handleSubmit
  // ==============================================================
  describe("handleSubmit function", () => {
    it("deve mostrar toast de erro quando senha é muito fraca", async (): Promise<void> => {
      const { getByLabelText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
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

    it("deve mostrar toast de erro quando senhas não coincidem", async (): Promise<void> => {
      const { getByLabelText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(
        getByLabelText(t.fields.confirmPassword),
        "password456"
      );
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

    it("deve fazer signup com sucesso quando todos os campos estão válidos", async (): Promise<void> => {
      mockSignup.mockResolvedValueOnce(undefined);
      const { getByLabelText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(
        getByLabelText(t.fields.confirmPassword),
        "password123"
      );
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith({
          email: "joao@test.com",
          password: "password123",
          name: "João Silva",
        });
      });

      expect(mockOnSignupSuccess).toHaveBeenCalledWith("joao@test.com");
      expect(showToast).toHaveBeenCalledWith(
        "success",
        t.toasts.success.title,
        t.toasts.success.message
      );
      // SignupForm calls onSignupSuccess and shows toast on success.
      // Navigation is handled by the parent; do not assert router.replace here.
    });

    it("deve mostrar toast de erro quando email já está em uso", async (): Promise<void> => {
      const emailInUseError = new Error("Email already in use") as Error & {
        code?: string;
      };
      emailInUseError.code = "auth/email-already-in-use";
      mockSignup.mockRejectedValueOnce(emailInUseError);

      const { getByLabelText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(
        getByLabelText(t.fields.confirmPassword),
        "password123"
      );
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith({
          email: "joao@test.com",
          password: "password123",
          name: "João Silva",
        });
      });

      expect(showToast).toHaveBeenCalledWith(
        "error",
        t.toasts.emailInUse.title,
        t.toasts.emailInUse.message
      );
      expect(mockOnSignupSuccess).not.toHaveBeenCalled();
      expect(router.replace).not.toHaveBeenCalled();
    });

    it("deve mostrar toast de erro genérico quando signup falha com erro desconhecido", async (): Promise<void> => {
      const genericError = new Error("Unknown error");
      mockSignup.mockRejectedValueOnce(genericError);

      const { getByLabelText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
      const t = texts.signupForm;

      fireEvent.changeText(getByLabelText(t.fields.name), "João Silva");
      fireEvent.changeText(getByLabelText(t.fields.email), "joao@test.com");
      fireEvent.changeText(getByLabelText(t.fields.password), "password123");
      fireEvent.changeText(
        getByLabelText(t.fields.confirmPassword),
        "password123"
      );
      fireEvent.press(getByLabelText(t.accessibility.checkbox));

      const submitButton = getByLabelText(t.buttons.submit);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith({
          email: "joao@test.com",
          password: "password123",
          name: "João Silva",
        });
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

  // ==============================================================
  // validateEmail
  // ==============================================================
  describe("validateEmail function", () => {
    it("deve mostrar erro quando email é inválido", (): void => {
      const { getByLabelText, getByText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
      const t = texts.signupForm;

      const emailInput = getByLabelText(t.fields.email);
      fireEvent.changeText(emailInput, "email-invalido");

      expect(
        getByText("Dado incorreto. Revise e digite novamente.")
      ).toBeTruthy();
    });

    it("não deve mostrar erro quando email é válido", (): void => {
      const { getByLabelText, queryByText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
      const t = texts.signupForm;

      const emailInput = getByLabelText(t.fields.email);
      fireEvent.changeText(emailInput, "joao@test.com");

      expect(
        queryByText("Dado incorreto. Revise e digite novamente.")
      ).toBeNull();
    });
  });

  // ==============================================================
  // Renderização e comportamento geral
  // ==============================================================
  describe("Renderização e comportamento geral", () => {
    it("renderiza todos os elementos do formulário", (): void => {
      const { getByText, getByLabelText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
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

    it("deve navegar para home quando botão voltar é pressionado", (): void => {
      const { getByLabelText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
      const t = texts.signupForm;

      const backButton = getByLabelText(t.buttons.back);
      fireEvent.press(backButton);

      expect(router.push).toHaveBeenCalledWith("/home");
    });

    it("deve permitir digitar nos campos de entrada", (): void => {
      const { getByLabelText } = render(
        <SignupForm onSignupSuccess={mockOnSignupSuccess} />
      );
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
