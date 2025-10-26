import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTransactions } from "@presentation/state/TransactionsContext";
import { texts } from "@presentation/theme";
import {
  formatTransactionDescription,
  showToast,
} from "@shared/utils/transactions.utils";
import { NewTransactionForm } from "./NewTransactionForm";

jest.mock("@presentation/state/TransactionsContext", () => ({
  useTransactions: jest.fn(),
}));

jest.mock("@shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
  formatTransactionDescription: jest.fn(() => "Descrição gerada"),
}));

jest.mock("react-native-dropdown-picker", () => {
  const MockDropDownPicker = (props: any) => (
    <TouchableOpacity
      accessibilityLabel="mock-dropdown"
      onPress={() => props.setValue?.(() => "deposito")}
    >
      <Text>{props.placeholder || "Selecione"}</Text>
    </TouchableOpacity>
  );
  (MockDropDownPicker as any).displayName = "MockDropDownPicker";
  return MockDropDownPicker;
});

jest.mock("react-native-mask-text", () => {
  const MaskedTextInput = ({
    onChangeText,
    accessibilityLabel,
    value,
    ...rest
  }: any) => (
    <TextInput
      accessibilityLabel={accessibilityLabel || "masked-input"}
      value={value}
      onChangeText={(text: string) => onChangeText?.(text, text)}
      {...rest}
    />
  );
  (MaskedTextInput as any).displayName = "MaskedTextInputMock";
  return { MaskedTextInput };
});

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const KeyboardAwareScrollView = ({ children, ...props }: any) => (
    <View {...props}>{children}</View>
  );
  (KeyboardAwareScrollView as any).displayName = "KeyboardAwareScrollViewMock";
  return { KeyboardAwareScrollView };
});

jest.mock("react-native-safe-area-context", () => {
  const SafeAreaView = ({ children, ...props }: any) => (
    <View {...props}>{children}</View>
  );
  (SafeAreaView as any).displayName = "SafeAreaViewMock";
  return { SafeAreaView };
});

jest.mock("@assets/images/dash-card-new-transacao/card-pixels-3.svg", () => "CardPixelsTop");
jest.mock("@/assets/images/dash-card-new-transacao/card-pixels-4.svg", () => "CardPixelBotton");
jest.mock("@/assets/images/dash-card-new-transacao/Ilustracao-2.svg", () => "TransactionIllustration");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

const mockAddTransaction = jest.fn();

beforeEach(() => {
  (useTransactions as jest.Mock).mockReturnValue({
    addTransaction: mockAddTransaction,
  });
  jest.clearAllMocks();
});

describe("NewTransactionForm", () => {
  it("renderiza título, inputs e botão", () => {
    render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    expect(screen.getByText(t.title)).toBeTruthy();
    expect(screen.getByLabelText(t.accessibility.form)).toBeTruthy();
    expect(screen.getByLabelText(t.accessibility.transactionTypeInput)).toBeTruthy();
    expect(screen.getByLabelText(t.accessibility.amountInput)).toBeTruthy();
    expect(screen.getByLabelText(t.accessibility.submitButton)).toBeTruthy();
  });

  it("inicialmente desabilita o botão de enviar", () => {
    render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    const submit = screen.getByLabelText(t.accessibility.submitButton);
    expect(submit.props.accessibilityState?.disabled).toBe(true);
  });

  it("habilita o botão ao preencher tipo+valor e envia com sucesso", async () => {
    render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    fireEvent.press(screen.getByLabelText("mock-dropdown"));
    fireEvent.changeText(screen.getByLabelText(t.accessibility.amountInput), "1000");

    const submit = screen.getByLabelText(t.accessibility.submitButton);
    expect(submit.props.accessibilityState?.disabled).toBe(false);

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

  it("mostra toast de erro quando addTransaction rejeita", async () => {
    mockAddTransaction.mockRejectedValueOnce(new Error("API fail"));
    render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    fireEvent.press(screen.getByLabelText("mock-dropdown"));
    fireEvent.changeText(screen.getByLabelText(t.accessibility.amountInput), "1000");

    fireEvent.press(screen.getByLabelText(t.accessibility.submitButton));

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
