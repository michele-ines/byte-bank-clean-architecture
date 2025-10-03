import { useTransactions } from "@/src/contexts/TransactionsContext";
import { texts } from "@/src/theme/texts";
import { formatTransactionDescription, showToast } from "@/src/utils/transactions.utils";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { NewTransactionForm } from "./NewTransactionForm";

// ▶️ Silencia console.error
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

// ▶️ MOCK do contexto de transações
const mockAddTransaction = jest.fn();
jest.mock("@/src/contexts/TransactionsContext", () => ({
  useTransactions: jest.fn(),
}));

// ▶️ MOCK dos utils (sem importar react-native-toast-message real)
jest.mock("@/src/utils/transactions.utils", () => ({
  showToast: jest.fn(),
  formatTransactionDescription: jest.fn(() => "Descrição gerada"),
}));

// ▶️ MOCK do DropDownPicker
jest.mock("react-native-dropdown-picker", () => {
  const React = require("react");
  const { TouchableOpacity, Text } = require("react-native");
  return function MockDropDownPicker(props: any) {
    return (
      <TouchableOpacity
        accessibilityLabel="mock-dropdown"
        onPress={() => props.setValue(() => "deposito")}
      >
        <Text>{props.placeholder || "Selecione"}</Text>
      </TouchableOpacity>
    );
  };
});

// ▶️ MOCK do MaskedTextInput
jest.mock("react-native-mask-text", () => {
  const React = require("react");
  const { TextInput } = require("react-native");
  return {
    MaskedTextInput: ({
      onChangeText,
      accessibilityLabel,
      value,
      ...rest
    }: any) => (
      <TextInput
        accessibilityLabel={accessibilityLabel || "masked-input"}
        value={value}
        onChangeText={(text: string) => onChangeText(text, text)}
        {...rest}
      />
    ),
  };
});

// ▶️ MOCK do KeyboardAwareScrollView (props preservados!)
jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    KeyboardAwareScrollView: ({ children, ...props }: any) => (
      <View {...props}>{children}</View>
    ),
  };
});

// ▶️ MOCK do SafeAreaView
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children, ...props }: any) => <View {...props}>{children}</View>,
  };
});

// ▶️ MOCK dos SVGs
jest.mock("@/assets/images/dash-card-new-transacao/card-pixels-3.svg", () => "CardPixelsTop");
jest.mock("@/assets/images/dash-card-new-transacao/card-pixels-4.svg", () => "CardPixelBotton");
jest.mock("@/assets/images/dash-card-new-transacao/Ilustracao-2.svg", () => "TransactionIllustration");

describe("NewTransactionForm", () => {
  beforeEach(() => {
    (useTransactions as jest.Mock).mockReturnValue({
      addTransaction: mockAddTransaction,
    });
    jest.clearAllMocks();
  });

  it("renderiza título, inputs e botão", () => {
    const { getByText, getByLabelText } = render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    expect(getByText(t.title)).toBeTruthy();
    expect(getByLabelText(t.accessibility.form)).toBeTruthy();
    expect(getByLabelText(t.accessibility.transactionTypeInput)).toBeTruthy();
    expect(getByLabelText(t.accessibility.amountInput)).toBeTruthy();
    expect(getByLabelText(t.accessibility.submitButton)).toBeTruthy();
  });

  it("inicialmente desabilita o botão de enviar", () => {
    const { getByLabelText } = render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    const submit = getByLabelText(t.accessibility.submitButton);
    expect(submit.props.accessibilityState?.disabled).toBe(true);
  });

  it("habilita o botão ao preencher tipo+valor e envia com sucesso", async () => {
    const { getByLabelText } = render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    fireEvent.press(getByLabelText("mock-dropdown"));
    fireEvent.changeText(getByLabelText(t.accessibility.amountInput), "1000");

    const submit = getByLabelText(t.accessibility.submitButton);
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
    const { getByLabelText } = render(<NewTransactionForm />);
    const t = texts.newTransactionForm;

    fireEvent.press(getByLabelText("mock-dropdown"));
    fireEvent.changeText(getByLabelText(t.accessibility.amountInput), "1000");

    fireEvent.press(getByLabelText(t.accessibility.submitButton));

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
