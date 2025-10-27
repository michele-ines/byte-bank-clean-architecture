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
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { NewTransactionForm } from "./NewTransactionForm";

jest.mock("@presentation/state/TransactionsContext", () => ({
  useTransactions: jest.fn(),
}));

jest.mock("@shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
  formatTransactionDescription: jest.fn(() => "Descrição gerada"),
}));

jest.mock("react-native-dropdown-picker", () => {
  const MockDropDownPicker = (props: {
    setValue?: (fn: () => string) => void;
    placeholder?: string;
  }): JSX.Element => (
    <TouchableOpacity
      accessibilityLabel="mock-dropdown"
      onPress={() => props.setValue?.(() => "deposito")}
    >
      <Text>{props.placeholder ?? "Selecione"}</Text> {/* ✅ usa ?? */}
    </TouchableOpacity>
  );
  MockDropDownPicker.displayName = "MockDropDownPicker";
  return MockDropDownPicker;
});

jest.mock("react-native-mask-text", () => {
  const MaskedTextInput = ({
    onChangeText,
    accessibilityLabel,
    value,
    ...rest
  }: {
    onChangeText?: (formatted: string, extracted: string) => void;
    accessibilityLabel?: string;
    value?: string;
  }): JSX.Element => (
    <TextInput
      accessibilityLabel={accessibilityLabel ?? "masked-input"}
      value={value}
      onChangeText={(text: string) => onChangeText?.(text, text)}
      {...rest}
    />
  );
  MaskedTextInput.displayName = "MaskedTextInputMock";
  return { MaskedTextInput };
});

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const KeyboardAwareScrollView = ({
    children,
    ...props
  }: {
    children: React.ReactNode;
  }): JSX.Element => <View {...props}>{children}</View>;
  KeyboardAwareScrollView.displayName = "KeyboardAwareScrollViewMock";
  return { KeyboardAwareScrollView };
});

jest.mock("react-native-safe-area-context", () => {
  const SafeAreaView = ({
    children,
    ...props
  }: {
    children: React.ReactNode;
  }): JSX.Element => <View {...props}>{children}</View>;
  SafeAreaView.displayName = "SafeAreaViewMock";
  return { SafeAreaView };
});

jest.mock(
  "@assets/images/dash-card-new-transacao/card-pixels-3.svg",
  () => "CardPixelsTop"
);
jest.mock(
  "@/assets/images/dash-card-new-transacao/card-pixels-4.svg",
  () => "CardPixelBotton"
);
jest.mock(
  "@/assets/images/dash-card-new-transacao/Ilustracao-2.svg",
  () => "TransactionIllustration"
);

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
      expect(mockAddTransaction).toHaveBeenCalledWith({
        tipo: "deposito",
        valor: 10,
        description: "Descrição gerada",
      });
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
