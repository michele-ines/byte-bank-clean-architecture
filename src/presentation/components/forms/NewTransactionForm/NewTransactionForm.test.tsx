import { useTransactions } from "@presentation/state/TransactionsContext";
import { texts } from "@presentation/theme";
import {
  formatTransactionDescription,
  showToast,
} from "@shared/utils/transactions.utils";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import type { JSX } from "react";
import { NewTransactionForm } from "./NewTransactionForm";

jest.mock("firebase/firestore", () => ({
  Timestamp: {
    now: () => ({ seconds: Math.floor(Date.now() / 1000) }),
    fromDate: (d: Date) => ({ seconds: Math.floor(d.getTime() / 1000) }),
  },
}));

jest.mock("@presentation/state/TransactionsContext", () => ({
  useTransactions: jest.fn(),
}));

jest.mock("@shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
  formatTransactionDescription: jest.fn(() => "Descrição gerada"),
}));

jest.mock("react-native-dropdown-picker", () => {
  const ReactLib = require("react") as {
    createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element;
  };
  const RN = require("react-native") as {
    TouchableOpacity: unknown;
    Text: unknown;
  };
  const TouchableOpacityMock = RN.TouchableOpacity;
  const TextMock = RN.Text;
  const MockDropDownPicker = (
    props: { setValue?: (fn: () => string) => void; placeholder?: string }
  ): JSX.Element =>
    ReactLib.createElement(
      TouchableOpacityMock,
      { accessibilityLabel: "mock-dropdown", onPress: () => props.setValue?.(() => "deposito") },
      ReactLib.createElement(TextMock, null, props.placeholder ?? "Selecione")
    );
  MockDropDownPicker.displayName = "MockDropDownPicker";
  return MockDropDownPicker;
});

jest.mock("react-native-mask-text", () => {
  const ReactLib = require("react") as {
    createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element;
  };
  const RN = require("react-native") as {
    TextInput: unknown;
  };
  const TextInputMock = RN.TextInput;
  const MaskedTextInput = ({
    onChangeText,
    accessibilityLabel,
    value,
    ...rest
  }: {
    onChangeText?: (formatted: string, extracted: string) => void;
    accessibilityLabel?: string;
    value?: string;
  }): JSX.Element =>
    ReactLib.createElement(TextInputMock, {
      accessibilityLabel: accessibilityLabel ?? "masked-input",
      value,
      onChangeText: (text: string) => onChangeText?.(text, text),
      ...rest,
    });
  MaskedTextInput.displayName = "MaskedTextInputMock";
  return { MaskedTextInput };
});

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const ReactLib = require("react") as {
    createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element;
  };
  const RN = require("react-native") as {
    View: unknown;
  };
  const ViewMock = RN.View;
  const KeyboardAwareScrollView = ({
    children,
    ...props
  }: {
    children: unknown;
    [key: string]: unknown;
  }): JSX.Element => ReactLib.createElement(ViewMock, props, children);
  KeyboardAwareScrollView.displayName = "KeyboardAwareScrollViewMock";
  return { KeyboardAwareScrollView };
});

jest.mock("react-native-safe-area-context", () => {
  const ReactLib = require("react") as {
    createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element;
  };
  const RN = require("react-native") as {
    View: unknown;
  };
  const ViewMock = RN.View;
  const SafeAreaView = ({
    children,
    ...props
  }: {
    children: unknown;
    [key: string]: unknown;
  }): JSX.Element => ReactLib.createElement(ViewMock, props, children);
  SafeAreaView.displayName = "SafeAreaViewMock";
  return { SafeAreaView };
});

jest.mock("@assets/images/dash-card-new-transacao/card-pixels-3.svg", () => "CardPixelsTop");
jest.mock("@assets/images/dash-card-new-transacao/card-pixels-4.svg", () => "CardPixelBotton");
jest.mock("@assets/images/dash-card-new-transacao/Ilustracao-2.svg", () => "TransactionIllustration");

beforeAll((): void => {
  jest.spyOn(console, "error").mockImplementation(() => {
    /* ✅ evita erro de função vazia */
  });
});
afterAll((): void => {
  (console.error as jest.Mock).mockRestore();
});

const mockAddTransaction = jest.fn();

beforeEach((): void => {
  (useTransactions as jest.Mock).mockReturnValue({
    addTransaction: mockAddTransaction,
  });
  jest.clearAllMocks();
});

describe("NewTransactionForm", () => {
  it("renderiza título, inputs e botão", (): void => {
    render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    expect(screen.getByText(t.title)).toBeTruthy();
    expect(screen.getByLabelText(t.accessibility.form)).toBeTruthy();
    expect(
      screen.getByLabelText(t.accessibility.transactionTypeInput)
    ).toBeTruthy();
    expect(screen.getByLabelText(t.accessibility.amountInput)).toBeTruthy();
    expect(screen.getByLabelText(t.accessibility.submitButton)).toBeTruthy();
  });

  it("inicialmente desabilita o botão de enviar", (): void => {
    render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    const submit = screen.getByLabelText(t.accessibility.submitButton);
    expect(submit).toBeDisabled();
  });

  it("habilita o botão ao preencher tipo+valor e envia com sucesso", async (): Promise<void> => {
    render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    fireEvent.press(screen.getByLabelText("mock-dropdown"));
    fireEvent.changeText(
      screen.getByLabelText(t.accessibility.amountInput),
      "1000"
    );

    const submit = screen.getByLabelText(t.accessibility.submitButton);
    expect(submit).not.toBeDisabled();

    fireEvent.press(submit);

      await waitFor(() => {
        expect(formatTransactionDescription).toHaveBeenCalledWith("deposito", 10);
        expect(mockAddTransaction).toHaveBeenCalledWith(
          expect.objectContaining({
            descricao: "Descrição gerada",
            valor: 10,
            tipo: "entrada",
            categoria: "",
          }),
          []
        );
        const mockCall: unknown = mockAddTransaction.mock.calls[0];
        if (
          mockCall &&
          Array.isArray(mockCall) &&
          mockCall.length > 0 &&
          mockCall[0] &&
          typeof mockCall[0] === "object" &&
          !Array.isArray(mockCall[0]) &&
          mockCall[0] !== null
        ) {
          const firstArg = mockCall[0] as Record<string, unknown>;
          expect(firstArg).toHaveProperty("data");
        }
        expect(showToast).toHaveBeenCalledWith(
          "success",
          t.toasts.success.title,
          t.toasts.success.message
        );
      });
  });

  it("mostra toast de erro quando addTransaction rejeita", async (): Promise<void> => {
    mockAddTransaction.mockRejectedValueOnce(new Error("API fail"));
    render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    fireEvent.press(screen.getByLabelText("mock-dropdown"));
    fireEvent.changeText(
      screen.getByLabelText(t.accessibility.amountInput),
      "1000"
    );

    const submit = screen.getByLabelText(t.accessibility.submitButton);
    fireEvent.press(submit);

    await waitFor(() => {
      expect(mockAddTransaction).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith(
        "error",
        t.toasts.error.title,
        t.toasts.error.message
      );
    });
  });
});
