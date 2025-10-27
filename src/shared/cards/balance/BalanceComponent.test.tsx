import { fireEvent, render, screen } from "@testing-library/react-native";
import type { UserInfo } from "firebase/auth";
import React from "react";
import Balance from "./BalanceComponent";

// ✅ Mock utils
jest.mock("@/shared/utils/currency-formatte", () => ({
  formatBRL: jest.fn((value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`),
}));
jest.mock("@/shared/utils/string", () => ({
  getFirstName: jest.fn((fullName: string) => fullName?.split(" ")[0] || ""),
}));
jest.mock("@/shared/utils/date", () => ({
  getCurrentDate: jest.fn(() => "Segunda-feira, 15/01/2024"),
}));
jest.mock("@expo/vector-icons", () => ({ Entypo: "Entypo" }));
jest.mock("@assets/images/dash-card-saldo/card-pixels-1.svg", () => "card-pixels-1.svg");
jest.mock("@assets/images/dash-card-saldo/card-pixels-2.svg", () => "card-pixels-2.svg");

// ✅ Helper para criar mock de usuário
const makeMockUser = (overrides?: Partial<UserInfo>): UserInfo =>
  ({
    displayName: "John Silva Santos",
    email: "john@email.com",
    uid: "test-uid",
    providerId: "firebase",
    phoneNumber: null,
    photoURL: null,
    ...overrides,
  } as UserInfo);

describe("BalanceComponent", () => {
  const mockUser = makeMockUser();
  const mockBalance = { account: "Current Account", value: 1500.75 };

  const defaultProps = { user: mockUser, balance: mockBalance };

  beforeEach(() => jest.clearAllMocks());

  // ✅ Helper moderno sem ReactTestInstance
  const getLabel = (label: string): ReturnType<typeof screen.getByLabelText> =>
    screen.getByLabelText(label);

  it("should toggle visibility correctly", (): void => {
    render(<Balance {...defaultProps} />);

    const toggleButton = getLabel("Ocultar saldo da conta");
    fireEvent.press(toggleButton);

    expect(screen.getByText("••••••")).toBeTruthy();

    const showButton = getLabel("Mostrar saldo da conta");
    fireEvent.press(showButton);

    expect(screen.getByText("R$ 1500,75")).toBeTruthy();
  });
});
